<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

use QCloud\Live\Query;
class Search extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $keyword = $this->input->get_post('keyword');
    	$from = $this->input->get_post('from');
    	$tab = $this->input->get_post('tab');
    	if($keyword === '' || is_null($keyword)){
    		$this->ajaxReturn([], 1, '请输入关键词搜索');
    	}
    	if(! in_array($from, array('shop', 'knowledge', 'chat'))){
    		$this->ajaxReturn([], 2, '搜索模块暂不支持');
    	}

    	$this->keyword = $keyword;
    	$this->from = $from;
    	$this->tab = $tab;
    }

    /**
     * @api {get} /api/search 搜索
     * @apiVersion 1.0.0
     * @apiName search
     * @apiGroup api
     *
     * @apiSampleRequest /api/search
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} keyword 搜索词
     * @apiParam {String} from 来源 知识：knowledge 商城：shop 聊天：chat
     * @apiParam {String} tab 显示卡项 专辑：album 主播：anchor 直播：live 音频：audio
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "room_id": "52",
	 *                 "title": "你的出生地址",
	 *                 "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *                 "play_url": {
	 *                     "rtmp": "rtmp://6077.liveplay.myqcloud.com/live/6077_zhumaidan-1-52",
	 *                     "flv": "http://6077.liveplay.myqcloud.com/live/6077_zhumaidan-1-52.flv",
	 *                     "m3u8": "http://6077.liveplay.myqcloud.com/live/6077_zhumaidan-1-52.m3u8"
	 *                 },
	 *                 "live_tag_id": "0",
	 *                 "anchor_uid": "1",
	 *                 "views": "0",
	 *                 "price": "10000.00",
	 *                 "tag_name": "",
	 *                 "live_status": 1,
	 *                 "nickname": "aicode",
	 *                 "v": "0"
	 *             }
	 *         ]
	 *     },
	 *     "status": 0,
	 *     "message": "成功"
	 * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function index()
    {
    	$ret = array('count' => 0, 'list' => array());
    	if($this->from == 'shop'){

    	}elseif($this->from == 'knowledge'){
    		switch($this->tab){
    			case 'album':
    				$ret = $this->_album();
    				break;
    			case 'anchor':
    				$ret = $this->_anchor();
    				break;
    			case 'live':
    				$ret = $this->_live();
    				break;
    			case 'audio':
    				$ret = $this->_audio();
    				break;
    		}
    	}elseif($this->from == 'chat'){
            $ret = $this->_user();
        }

    	$this->ajaxReturn($ret);
    }

    //会员
    protected function _user()
    {
        $ret = array('count' => 0, 'list' => array());
        $where = array('enable' => 1);

        $this->db->group_start();
        $this->db->like('nickname', $this->keyword);
        $this->db->or_where('id', $this->keyword);
        $this->db->or_where('pretty_id', $this->keyword);
        $this->db->group_end();

        $this->load->model('Users_model');

        $ret['count'] = $this->Users_model->count_by($where);
        if($ret['count']){
            $order_by = array('sort' => 'desc', 'updated_at' => 'desc');
            $this->db->select('id,nickname,v,exp,header,summary');

            $this->db->group_start();
            $this->db->like('nickname', $this->keyword);
            $this->db->or_where('id', $this->keyword);
            $this->db->or_where('pretty_id', $this->keyword);
            $this->db->group_end();

            $list = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

            if($list){
                $this->load->model('Grade_model');
                foreach($list as $item){
                    $grade = $this->Grade_model->exp_to_grade($item['exp']);
                    $item['lv'] = $grade['grade_name'];

                    $ret['list'][] = $item;
                }
            }
        }

        return $ret;
    }

    //专辑
    protected function _album()
	{
		$ret = array('count' => 0, 'list' => array());
		$where = array('enable' => 1, 'public' => 1);
		$this->db->like('title', $this->keyword);
		$this->load->model('Album_model');

		$ret['count'] = $this->Album_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
			$this->db->select('id,cover_image,title,price');
			$this->db->like('title', $this->keyword);
			$ret['list'] = $this->Album_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$this->Album_model->audio($ret);
		}

		return $ret;
	}

    //主播
    protected function _anchor()
    {
    	$ret = array('count' => 0, 'list' => array());
		$where = array('enable' => 1);
		$where['anchor'] = 2;
		
		$this->db->group_start();
		$this->db->like('nickname', $this->keyword);
		$this->db->or_where('pretty_id', $this->keyword);
		$this->db->group_end();
		
		$this->load->model('Users_model');

		$ret['count'] = $this->Users_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
			$this->db->select('id,nickname,v,exp,header,summary');

			$this->db->group_start();
			$this->db->like('nickname', $this->keyword);
			$this->db->or_where('pretty_id', $this->keyword);
			$this->db->group_end();

			$ret['list'] = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			if($ret['list']){
	            $a_id = array();
	            foreach($ret['list'] as $item){
	                $a_id[] = $item['id'];
	            }
	            if($a_id){
	            	$this->load->model('Users_collection_model');
	                $fans = $this->Users_collection_model->get_many_count_fans($a_id);
	                $this->load->model('Room_audio_model');
	                $audio = $this->Room_audio_model->get_many_count_music($a_id);
	                foreach($ret['list'] as $key=>$item){
	                    $ret['list'][$key]['fans'] = isset($fans[$item['id']]) ? $fans[$item['id']] : 0;
	                    $ret['list'][$key]['music'] = isset($audio[$item['id']]) ? $audio[$item['id']] : 0;
	                    $ret['list'][$key]['hasFans'] = $this->Users_collection_model->check_fans($this->user_id, $item['id']);
	                }
	            }
	        }
		}

		return $ret;
    }

    //直播
    protected function _live()
    {
    	$ret = array('count' => 0, 'list' => array());
    	$this->load->model('Room_model');

        $online = array();
        $QLive = new Query();
        $config = config_item('live');
        $QLive->setAppInfo($config['appid'], $config['api_key'], $config['push_key'], $config['bizid']);
        $response = $QLive->Live_Channel_GetLiveChannelList();
        $a_room_id = array();
        $a_user_id = array();
        if($result = json_decode($response, true)){
            if($result['ret'] == 0 && $result['output']['all_count']){
                foreach($result['output']['channel_list'] as $channel_id){
                    $this->Room_model->set_userid_roomid_by_channel($channel_id);
                    $a_room_id[] = $this->Room_model->room_id;
                    $a_user_id[] = $this->Room_model->user_id;
                    if(count($a_room_id) > 1000){
                        break;
                    }
                }

                //昵称匹配
                $this->db->select('id');
                $this->db->where_in('id', $a_user_id);

				$this->db->group_start();
				$this->db->like('nickname', $this->keyword);
				$this->db->or_where('pretty_id', $this->keyword);
				$this->db->group_end();

				$this->load->model('Users_model');
				$a_user = $this->Users_model->get_all();

                $order_by = array('sort' => 'desc', 'id' => 'desc');
                $this->db->select('id as room_id,title,cover_image,play_url,live_tag_id,anchor_uid,views,price');
                $this->db->where_in('id', $a_room_id);

                $this->db->group_start();
				$this->db->like('title', $this->keyword);
				$a_user && $this->db->or_where_in('anchor_uid', $a_user);
				$this->db->group_end();

                if(is_numeric($this->keyword)){
                    $this->db->or_group_start();
                    $this->db->where('id', $this->keyword);
                    $this->db->group_end();
                }
                $online = $this->Room_model->order_by($order_by)->get_all();
            }
        }

        $ret['list'] = $this->Room_model->live_anchor($online, 1);
        $ret['count'] = count($ret['list']);
        return $ret;
    }

    //音频
    protected function _audio()
    {
    	$ret = array('count' => 0, 'list' => array());
		$where = array('enable' => 1);
		$where['album_id >'] = 0;
		$this->db->like('title', $this->keyword);
		$this->load->model('Room_audio_model');

		$ret['count'] = $this->Room_audio_model->count_by($where);
		if($ret['count']){
			$order_by = array('updated_at' => 'desc', 'id' => 'desc');
			$this->db->select('id,cover_image,title,price,updated_at,duration,play_times,album_id,anchor_uid');
			$this->db->like('title', $this->keyword);
			$ret['list'] = $this->Room_audio_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		return $ret;
    }
}
