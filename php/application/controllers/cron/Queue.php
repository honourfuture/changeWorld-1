<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 队列任务
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 * @date 2018-3-7
 */
use RongCloud\RongCloud;

class Queue extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('Queue_model');
        $this->load->driver('cache');
    }

    public function robot()
    {
        $num = 50;
        if($num){
            $this->load->model('Users_model');
            $rows = [];
            // $date = date("Y-m-d H:i:s");
            $password = 'aicode.org.cn';
            $password = $this->Users_model->get_password($password);

            $this->load->model('Robot_header_model');
            $this->load->model('Robot_nickname_model');
            // $this->db->select('header');
            /*$a_header = $this->Robot_header_model->count_all();
            if(!$a_header){
                $this->ajaxReturn([], 5, '请先上传机器人头像');
            }*/
            $cache_id_header = 'robot_header';
            $max_header_id = $this->cache->file->get($cache_id_header);
            if(!$max_header_id){
                $max_header_id = 0;
            }

            $cache_id_nickname = 'robot_nickname';
            $max_nickname_id = $this->cache->file->get($cache_id_nickname);
            if(!$max_nickname_id){
                $max_nickname_id = 0;
            }

            $max_robot = 3000000;
            if($max_header_id > $max_robot || $max_nickname_id > $max_robot){
                break;
            }

            // $this->db->select('nickname');
            /*$a_nickname = $this->Robot_nickname_model->count_all();
            if(!$a_nickname){
                $this->ajaxReturn([], 5, '请先上传机器人昵称');
            }*/

            $count = 0;
            /*$c_header = count($a_header) - 1;
            $c_nickname = count($a_nickname) - 1;*/
            for($i = 0; $i < $num; $i++){
                /*$k_header = mt_rand(0, $c_header);
                $header = $a_header[$k_header]['header'];*/
                $this->db->select('id,header');
                // $row_header = $this->Robot_header_model->order_by('', 'RANDOM')->limit(1)->get_by(['1 >' => 0]);
                $row_header = $this->Robot_header_model->order_by('id', 'asc')->limit(1)->get_by(['id >' => $max_header_id]);
                if(!$row_header){
                    break;
                }
                $header = $row_header['header'];

                /*$k_nickname = mt_rand(0, $c_nickname);
                $nickname = $a_nickname[$k_nickname]['nickname'];*/
                $this->db->select('id,nickname');
                // $row = $this->Robot_nickname_model->order_by('', 'RANDOM')->limit(1)->get_by(['1 >' => 0]);
                $row = $this->Robot_nickname_model->order_by('id', 'asc')->limit(1)->get_by(['id >' => $max_nickname_id]);
                if(!$row){
                    break;
                }
                $nickname = $row['nickname'];
                $max_nickname_id = $row['id'];
                $max_header_id = $row_header['id'];

                $get_next_id = $this->Users_model->get_next_id();
                $rows = [
                    'id' => mt_rand($get_next_id, $get_next_id + 50),
                    // 'created_at' => $date,
                    // 'updated_at' => $date,
                    'account' => $nickname,
                    'password' => $password,
                    'header' => $header,
                    'nickname' => $nickname,
                    'sex' => mt_rand(0, 2),
                    'robot' => 1
                ];
                $this->Users_model->insert($rows);
                $count++;

                if($i && $i % 49 == 0){
                    // usleep(5000);
                    sleep(1);
                }
            }

            $this->cache->file->save($cache_id_header, $max_header_id, 0);
            $this->cache->file->save($cache_id_nickname, $max_nickname_id, 0);

            /*$count = count($rows);
            if($rows){
                $this->db->insert_batch($this->Users_model->table(), $rows);
            }*/
            // $this->ajaxReturn([], 0, '生成机器人数: '.$count);
        }
    }

    protected function step_num($row)
    {
    	if(is_numeric($row['params']['step_num'])){
			$step_num = $row['params']['step_num'];
		}else{
			list($min, $max) = explode('-', $row['params']['step_num']);
			$step_num = mt_rand($min, $max);
		}

		return $step_num;
    }

    public function fans()
    {
    	$rows = $this->Queue_model->order_by('updated_at')->limit(50, 0)->get_many_by(['main_type' => 'fans', 'status' => 0]);
    	if($rows){
    		$this->load->model('Users_model');
    		$this->load->model('Users_collection_model');
    		foreach($rows as $row){
    			$row['params'] = json_decode($row['params'], true);
    			$cache_id = 'fans_'.$row['params']['id'].'_'.$row['id'];
                if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }


                $cache = $this->cache->file->get($cache_id);
                if($cache){
                    $cache_num = count($cache);
                    // $this->db->where_not_in('id', $cache);
                    $cache_chunk = array_chunk($cache, 100);
                    $this->db->group_start();
                    foreach($cache_chunk as $k=>$cache_ids){
                        if($k){
                            $this->db->or_where_not_in('id', $cache_ids);
                        }else{
                            $this->db->where_not_in('id', $cache_ids);
                        }
                    }
                    $this->db->group_end();
                }else{
                    $cache_num = 0;
                    $cache = [];
                }

                $step_num = $this->step_num($row);
    			$step_num = min($step_num, $row['params']['max'] - $cache_num);
    			if($step_num > 0){
	    			$this->db->select('id');
	    			$user = $this->Users_model->limit($step_num, 0)->get_many_by(['robot' => 1]);
	    			if($user){
                        if($step_num > count($user)){
                            $this->Queue_model->update($row['id'], ['status' => 2]);
                        }else{
                            $this->Queue_model->update($row['id'], ['status' => 0]);
                        }

		    			foreach($user as $item){
			    			$collection = [
			    				'user_id' => $item['id'],
			    				't_id' => $row['params']['id'],
			    				'topic' => 1
			    			];
			    			$this->Users_collection_model->insert($collection);

			    			$cache[] = $item['id'];
		    			}
		    			$this->cache->file->save($cache_id, $cache, 0);
	    			}else{
	    				$this->Queue_model->update($row['id'], ['status' => 2]);
	    			}
    			}else{
    				$this->Queue_model->update($row['id'], ['status' => 2]);
    			}

    		}
    	}
    }

    public function audio_play()
    {
    	$rows = $this->Queue_model->order_by('updated_at')->limit(50, 0)->get_many_by(['main_type' => 'audio_play', 'status' => 0]);
    	if($rows){
    		$this->load->model('Room_audio_model');
            // $this->load->model('Album_model');
    		foreach($rows as $row){
    			$row['params'] = json_decode($row['params'], true);
    			$cache_id = 'audio_play_'.$row['params']['id'].'_'.$row['id'];
                if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }



                $cache = $this->cache->file->get($cache_id);
                if(! $cache){
                    $cache = 0;
                }

                $step_num = $this->step_num($row);
    			$step_num = min($step_num, $row['params']['max'] - $cache);
    			if($step_num > 0){
    				$this->Queue_model->update($row['id'], ['status' => 0]);

    				$this->db->set('play_times', 'play_times +'.$step_num, false);
    				$this->db->where('id', $row['params']['id']);
    				$this->db->update($this->Room_audio_model->table());


                    /*$this->db->select('album_id');
                    $audio = $this->Room_audio_model->get($row['params']['id']);
                    if($audio && $audio['album_id']){
                        $this->db->set('play_times', 'play_times +'.$step_num, false);
                        $this->db->where('id', $audio['album_id']);
                        $this->db->update($this->Album_model->table());
                    }*/

    				$cache += $step_num;
    				$this->cache->file->save($cache_id, $cache, 0);
    			}else{
    				$this->Queue_model->update($row['id'], ['status' => 2]);
    			}

    		}
    	}
    }

    public function album_collection()
    {
    	$rows = $this->Queue_model->order_by('updated_at')->limit(30, 0)->get_many_by(['main_type' => 'album_collection', 'status' => 0]);
    	if($rows){
    		$this->load->model('Users_model');
    		$this->load->model('Users_collection_model');
    		foreach($rows as $row){
    			$row['params'] = json_decode($row['params'], true);
    			$cache_id = 'album_collection_'.$row['params']['id'].'_'.$row['id'];
                if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }


                $cache = $this->cache->file->get($cache_id);
                if($cache){
                    $cache_num = count($cache);
                    // $this->db->where_not_in('id', $cache);
                    $cache_chunk = array_chunk($cache, 100);
                    $this->db->group_start();
                    foreach($cache_chunk as $k=>$cache_ids){
                        if($k){
                            $this->db->or_where_not_in('id', $cache_ids);
                        }else{
                            $this->db->where_not_in('id', $cache_ids);
                        }
                    }
                    $this->db->group_end();
                }else{
                    $cache_num = 0;
                    $cache = [];
                }

                $step_num = $this->step_num($row);
    			$step_num = min($step_num, $row['params']['max'] - $cache_num);
    			if($step_num > 0){
	    			$this->db->select('id');
	    			$user = $this->Users_model->limit($step_num, 0)->get_many_by(['robot' => 1]);
	    			if($user){
	    				if($step_num > count($user)){
                            $this->Queue_model->update($row['id'], ['status' => 2]);
                        }else{
                            $this->Queue_model->update($row['id'], ['status' => 0]);
                        }

		    			foreach($user as $item){
			    			$collection = [
			    				'user_id' => $item['id'],
			    				't_id' => $row['params']['id'],
			    				'topic' => 2,
			    				'sub_topic' => 50
			    			];
			    			$this->Users_collection_model->insert($collection);

			    			$cache[] = $item['id'];
		    			}
		    			$this->cache->file->save($cache_id, $cache, 0);
	    			}else{
	    				$this->Queue_model->update($row['id'], ['status' => 2]);
	    			}
    			}else{
    				$this->Queue_model->update($row['id'], ['status' => 2]);
    			}

    		}
    	}
    }

    public function activity()
    {
    	$rows = $this->Queue_model->order_by('updated_at')->limit(20, 0)->get_many_by(['main_type' => 'activity', 'status' => 0]);
    	if($rows){
    		$this->load->model('Activity_model');
    		// $this->load->model('Activity_enter_model');
    		foreach($rows as $row){
    			$row['params'] = json_decode($row['params'], true);
    			$cache_id = 'activity_'.$row['params']['id'].'_'.$row['id'];
                if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }



                $cache = $this->cache->file->get($cache_id);
                if(! $cache){
                    $cache = 0;
                }

                $step_num = $this->step_num($row);
    			$step_num = min($step_num, $row['params']['max'] - $cache);
    			if($step_num > 0){
    				$this->Queue_model->update($row['id'], ['status' => 0]);

    				$this->db->set('views', 'views +'.$step_num, false);
    				$this->db->where('id', $row['params']['id']);
    				$this->db->update($this->Activity_model->table());

    				$cache += $step_num;
    				$this->cache->file->save($cache_id, $cache, 0);

    				//模拟投票
    			}else{
    				$this->Queue_model->update($row['id'], ['status' => 2]);
    			}

    		}
    	}
    }

    public function activity_vote()
    {
        $rows = $this->Queue_model->order_by('updated_at')->limit(20, 0)->get_many_by(['main_type' => 'activity_vote', 'status' => 0]);
        if($rows){
            $this->load->model('Users_model');
            $this->load->model('Activity_model');
            $this->load->model('Activity_enter_model');
            $this->load->model('Activity_vote_model');
            $h = date('YmdH');
            $ip = $this->input->ip_address();
            foreach($rows as $row){
                $row['params'] = json_decode($row['params'], true);
                $cache_id = 'activity_vote_'.$row['params']['id'].'_'.$row['id'];
                if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }


                $cache = $this->cache->file->get($cache_id);
                if($cache){
                    $cache_num = count($cache);
                    // $this->db->where_not_in('id', $cache);
                    $cache_chunk = array_chunk($cache, 100);
                    $this->db->group_start();
                    foreach($cache_chunk as $k=>$cache_ids){
                        if($k){
                            $this->db->or_where_not_in('id', $cache_ids);
                        }else{
                            $this->db->where_not_in('id', $cache_ids);
                        }
                    }
                    $this->db->group_end();
                }else{
                    $cache_num = 0;
                    $cache = [];
                }

                $step_num = $this->step_num($row);
                $step_num = min($step_num, $row['params']['max'] - $cache_num);
                if($step_num > 0){
                    $this->db->select('id');
                    $user = $this->Users_model->limit($step_num, 0)->get_many_by(['robot' => 1]);
                    $c_user = count($user);
                    if($user){
                        if($step_num > $c_user){
                            $this->Queue_model->update($row['id'], ['status' => 2]);
                        }else{
                            $this->Queue_model->update($row['id'], ['status' => 0]);
                        }

                        if($enter = $this->Activity_enter_model->get($row['params']['id'])){
                            //浏览
                            $views = $c_user * mt_rand(1, 5);
                            $this->db->set('views', 'views +'.$views, false);
                            $this->db->where('id', $enter['activity_id']);
                            $this->db->update($this->Activity_model->table());

                            foreach($user as $item){
                                //投票
                                $data = [
                                    'activity_id' => $enter['activity_id'],
                                    'user_id' => $enter['user_id'],
                                    'mobi' => '',
                                    'ip' => $ip,
                                    'h' => $h
                                ];
                                $this->Activity_vote_model->insert($data);

                                $this->db->set('vote', 'vote +1', false);
                                $this->db->where('id', $enter['id']);
                                $this->db->update($this->Activity_enter_model->table());
                                //点赞

                                $cache[] = $item['id'];
                            }
                            $this->cache->file->save($cache_id, $cache, 0);
                        }else{
                            $this->Queue_model->update($row['id'], ['status' => 2]);
                        }
                    }else{
                        $this->Queue_model->update($row['id'], ['status' => 2]);
                    }
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 2]);
                }

            }
        }
    }

    public function live_join()
    {
        $rows = $this->Queue_model->order_by('updated_at')->limit(5, 0)->get_many_by(['main_type' => 'live_join', 'status' => 0]);
        if($rows){
            $this->load->model('Users_model');
            $this->load->model('Room_model');
            $this->load->model('Live_online_model');

            $config    = config_item('rongcloud');
            $rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
            foreach($rows as $row){
                $row['params'] = json_decode($row['params'], true);
                $cache_id = 'live_join_'.$row['params']['id'].'_'.$row['id'];
                if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }

                /*$room = $this->Room_model->get($row['params']['id']);
                if(!$room || $row['status'] != 1){
                    continue;
                }*/

                $cache = $this->cache->file->get($cache_id);
                if($cache){
                    $cache_num = count($cache);
                    // $this->db->where_not_in('id', $cache);
                    $cache_chunk = array_chunk($cache, 100);
                    $this->db->group_start();
                    foreach($cache_chunk as $k=>$cache_ids){
                        if($k){
                            $this->db->or_where_not_in('id', $cache_ids);
                        }else{
                            $this->db->where_not_in('id', $cache_ids);
                        }
                    }
                    $this->db->group_end();
                }else{
                    $cache_num = 0;
                    $cache = [];
                }

                $step_num = $this->step_num($row);
                $step_num = min($step_num, $row['params']['max'] - $cache_num);
                $chat_room_id = [$row['params']['id']];
                $over = false;
                if($step_num > 0){
                    $this->db->select('id,nickname');//header,
                    $user = $this->Users_model->limit($step_num, 0)->get_many_by(['robot' => 1]);
                    if($user){
                        if($step_num > count($user)){
                            $this->Queue_model->update($row['id'], ['status' => 2]);
                            $over = true;
                        }else{
                            $this->Queue_model->update($row['id'], ['status' => 0]);
                        }

                        $insert_online = [];
                        $content = [
                            'cmd' => 'enter_batch',
                            'user' => []
                        ];
                        foreach($user as $item){
                            $cache[] = $item['id'];

                            $insert_online[] = [
                                'room_id' => $row['params']['id'],
                                'user_id' => $item['id']
                            ];

                            $content['user'][] = [
                                "userId" => $item['id'],
                                "name" => $item['nickname'],
                                "lv" => mt_rand(1, 5)
                            ];

                            /*$content      = [
                                "cmd" => "enter",
                                "userId" => $item['id'],
                                "name" => $item['nickname'],
                                "lv" => mt_rand(1, 5),
                                "avtar" => $item['header'],
                                "vip" => "",
                                "icon" => "",
                            ];
                            $result = $rongCloud->message()->publishChatroom($item['id'], $chat_room_id, 'RC:TxtMsg', json_encode(['content' => json_encode($content)]));
                            log_message('debug', 'cron live_join:'.$result);*/
                        }
                        $this->cache->file->save($cache_id, $cache, 0);

                        $this->db->set('views', 'views +'.count($user), false);
                        $this->db->where('id', $row['params']['id']);
                        $this->db->update($this->Room_model->table());

                        if($insert_online){
                            $this->Live_online_model->insert_many($insert_online);
                        }

                        $result = $rongCloud->message()->publishChatroom($user[0]['id'], $chat_room_id, 'RC:TxtMsg', json_encode(['content' => json_encode($content)]));
                    }else{
                        $this->Queue_model->update($row['id'], ['status' => 2]);
                        $over = true;
                    }
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 2]);
                    $over = true;
                }

                if($cache && $over){
                    $range = isset($row['params']['range']) ? $row['params']['range'] : $row['params']['max'].'-'.$row['params']['max']*2;
                    if(strpos($range, '-')){
                        list($min, $max) = explode('-', $range);
                        $content = [
                            'cmd' => 'randomWatchNum',
                            'min' => $min,
                            'max' => $max
                        ];
                        $result = $rongCloud->message()->publishChatroom($cache[0], $chat_room_id, 'RC:TxtMsg', json_encode(['content' => json_encode($content)]));
                    }
                }
            }
        }
    }

    public function live_chat()
    {
        $this->load->model('Room_model');
        $this->db->select('id,status,chat_file,chat_line,chat_stop');
        $rooms = $this->Room_model->get_many_by(['status' => 1]);
        if($rooms){
            $this->load->model('Users_model');
            $config    = config_item('rongcloud');
            $rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
            foreach($rooms as $room){
                if($room['chat_stop']){
                    continue;
                }
                $file = $room['chat_file'];
                if(!$file || !file_exists($file)){
                    continue;
                }

                /*$random_num = mt_rand(1, 5);
                if($random_num != 5){
                    continue;
                }*/


                $row = $this->Queue_model->order_by('id', 'desc')->get_by(['main_type' => 'live_join', 'sub_type' => $room['id']]);

                $row['params'] = json_decode($row['params'], true);
                $cache_id = 'live_join_'.$row['params']['id'].'_'.$row['id'];
                /*if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }*/

                $cache = $this->cache->file->get($cache_id);
                if(! $cache){
                    continue;
                }
                if(! $a_line = file($file)){
                    continue;
                }

                $step_num = $this->step_num($row);
                $step_num = min($step_num, 20);//$row['params']['max'] - $cache_num
                if(strpos($file, 'queue_') !== false){
                    if(! isset($a_line[$room['chat_line']])){
                        $step_num = 0;
                    }else{
                        $line = count($a_line) - $room['chat_line'];
                        $step_num = min($step_num, $line);
                    }
                }

                if($step_num > 0){
                    $step_num = min($step_num, count($cache));
                    $random_keys = array_rand($cache, $step_num);
                    if(!$random_keys){
                        continue;
                    }
                    $a_uid = [];
                    foreach($random_keys as $key=>$uid){
                        $a_uid[] = $cache[$uid];
                    }
                    $this->db->select('id,nickname');//header,
                    $user = $this->Users_model->get_many($a_uid);
                    if($user){
                        /*if($step_num > count($user)){
                            $this->Queue_model->update($row['id'], ['status' => 2]);
                        }else{
                            $this->Queue_model->update($row['id'], ['status' => 0]);
                        }*/

                        $chat_room_id = [$row['params']['id']];
                        $content = [
                            'cmd' => 'say_batch',
                            'user' => []
                        ];
                        $chat_line = $room['chat_line'];
                        foreach($user as $key=>$item){
                            // $cache[] = $item['id'];
                            if(! isset($a_line[$chat_line])){
                                $chat_line = 0;
                            }
                            $content['user'][] = [
                                "userId" => $item['id'],
                                "name" => $item['nickname'],
                                "lv" => mt_rand(1, 5),
                                "text" => trim($a_line[$chat_line], ',')
                            ];

                            // $rongCloud->Chatroom()->join($item['id'], $row['params']['id']);
                            /*$content      = [
                                "cmd" => "user",
                                "userId" => $item['id'],
                                "name" => $item['nickname'],
                                "lv" => 1,
                                "avtar" => $item['header'],
                                "text" => '主播为您报时：'.date("Y-m-d H:i:s"),
                            ];
                            $result = $rongCloud->message()->publishChatroom($item['id'], $chat_room_id, 'RC:TxtMsg', json_encode(['content' => json_encode($content)]));
                            log_message('debug', 'cron live_chat:'.$result);*/
                            $chat_line++;
                        }
                        // $this->cache->file->save($cache_id, $cache, 0);

                        /*$this->db->set('views', 'views +'.count($user), false);
                        $this->db->where('id', $row['id']);
                        $this->db->update($this->Room_model->table());*/
                        $this->Room_model->update($room['id'], ['chat_line' => $chat_line]);

                        $result = $rongCloud->message()->publishChatroom($user[0]['id'], $chat_room_id, 'RC:TxtMsg', json_encode(['content' => json_encode($content)]));
                    }else{
                        // $this->Queue_model->update($row['id'], ['status' => 2]);
                    }
                }else{
                    // $this->Queue_model->update($row['id'], ['status' => 2]);
                }
            }
        }
    }

    public function audio_comment()
    {
        $rows = $this->Queue_model->order_by('updated_at')->limit(50, 0)->get_many_by(['main_type' => 'audio_comment', 'status' => 0]);
        if($rows){
            $this->load->model('Album_audio_comment_model');
            $this->load->model('Users_model');
            foreach($rows as $row){
                $row['params'] = json_decode($row['params'], true);
                $file = FCPATH.$row['params']['filename'];
                if(!$file || !file_exists($file)){
                    continue;
                }

                $cache_id = 'audio_comment_'.$row['params']['id'].'_'.$row['id'];
                if(file_exists(APPPATH.'cache/'.$cache_id)){
                    $ntime = time();
                    $mtime = filemtime(APPPATH.'cache/'.$cache_id);
                    clearstatcache();
                    if($ntime > $mtime + $row['params']['step_times']){
                        $job = true;
                    }else{
                        $job = false;
                    }
                }else{
                    $job = true;
                }

                if($job){
                    $this->Queue_model->update($row['id'], ['status' => 1, 'exe_times' => $row['exe_times'] + 1]);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 0, 'exe_times' => $row['exe_times'] + 1]);
                    continue;
                }

                $cache = $this->cache->file->get($cache_id);
                if(! $cache){
                    $cache = 0;
                }

                if(! $a_line = file($file)){
                    continue;
                }
                $row['params']['max'] = count($a_line);

                $step_num = $this->step_num($row);
                $step_num = min($step_num, $row['params']['max'] - $cache);
                if($step_num > 0){
                    $this->Queue_model->update($row['id'], ['status' => 0]);

                    for($i = 0; $i < $step_num; $i++){
                        $this->db->select('id');
                        $user = $this->Users_model->order_by('', 'RANDOM')->limit(1)->get_by(['robot' => 1]);
                        $insert = [
                            'audio_id' => $row['params']['id'],
                            'comment' => trim($a_line[$cache+$i], ','),
                            'pid' => 0,
                            'album_id' => $row['params']['album_id'],
                            'user_id' => $user['id']
                        ];
                        $this->Album_audio_comment_model->insert($insert);
                    }

                    $cache += $step_num;
                    $this->cache->file->save($cache_id, $cache, 0);
                }else{
                    $this->Queue_model->update($row['id'], ['status' => 2]);
                }

            }
        }
    }
}
