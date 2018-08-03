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
    	$rows = $this->Queue_model->order_by('exe_times')->limit(5, 0)->get_many_by(['main_type' => 'fans', 'status' => 0]);
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
                    $this->db->where_not_in('id', $cache);
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
    	$rows = $this->Queue_model->order_by('exe_times')->limit(5, 0)->get_many_by(['main_type' => 'audio_play', 'status' => 0]);
    	if($rows){
    		$this->load->model('Room_audio_model');
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
    	$rows = $this->Queue_model->order_by('exe_times')->limit(5, 0)->get_many_by(['main_type' => 'album_collection', 'status' => 0]);
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
                    $this->db->where_not_in('id', $cache);
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
    	$rows = $this->Queue_model->order_by('exe_times')->limit(5, 0)->get_many_by(['main_type' => 'activity', 'status' => 0]);
    	if($rows){
    		$this->load->model('Activity_model');
    		// $thsi->load->model('Activity_enter_model');
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

    public function live_join()
    {
        $rows = $this->Queue_model->order_by('exe_times')->limit(1, 0)->get_many_by(['main_type' => 'live_join', 'status' => 0]);
        if($rows){
            $this->load->model('Users_model');
            $this->load->model('Room_model');

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
                    $this->db->where_not_in('id', $cache);
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

                        $content = [
                            'cmd' => 'enter_batch',
                            'user' => []
                        ];
                        foreach($user as $item){
                            $cache[] = $item['id'];

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

                $random_num = mt_rand(1, 5);
                if($random_num != 5){
                    continue;
                }


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

                $step_num = mt_rand(1, 10);//$this->step_num($row);
                // $step_num = min($step_num, $row['params']['max'] - $cache_num);
                if($step_num > 0){
                    $random_keys = array_rand($cache, $step_num);
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
                                "text" => $a_line[$chat_line]
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
}