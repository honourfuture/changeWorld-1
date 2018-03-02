<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 知识
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

use QCloud\Live\Query;
class Knowledge extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @api {get} /api/knowledge/collection 知识-关注(主播)
     * @apiVersion 1.0.0
     * @apiName knowledge_collection
     * @apiGroup api
     *
     * @apiSampleRequest /api/knowledge/collection
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Number} data.total 总数
     * @apiSuccess {Object[]} data.list 关注列表
     * @apiSuccess {Number} data.list.id 用户唯一ID
     * @apiSuccess {String} data.list.header 头像
     * @apiSuccess {String} data.list.nickname 昵称
     * @apiSuccess {String} data.list.summary 简介
     * @apiSuccess {Number} data.list.v v认证 0否 1是
     * @apiSuccess {Number} data.list.exp 经验值
     * @apiSuccess {Number} data.list.fans 粉丝数
     * @apiSuccess {Number} data.list.music 音乐数
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "total": 4,
     *         "list": [
     *             {
     *                 "id": "3",
     *                 "header": "",
     *                 "nickname": "匿名",
     *                 "summary": "",
     *                 "v": "0",
     *                 "exp": "0",
     *                 "fans": "1",
     *                 "music": 0
     *             },
     *             {
     *                 "id": "2",
     *                 "header": "",
     *                 "nickname": "匿名",
     *                 "summary": "",
     *                 "v": "0",
     *                 "exp": "0",
     *                 "fans": "2",
     *                 "music": 0
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
    public function collection()
    {
        $this->load->model('Users_collection_model');
        $ret = $this->Users_collection_model->get_collection_anchor($this->user_id, $this->per_page, $this->offset);
        if($ret['list']){
            $a_id = array();
            foreach($ret['list'] as $item){
                $a_id[] = $item['id'];
            }
            if($a_id){
                $fans = $this->Users_collection_model->get_many_count_fans($a_id);
                foreach($ret['list'] as $key=>$item){
                    $ret['list'][$key]['fans'] = isset($fans[$item['id']]) ? $fans[$item['id']] : 0;
                    $ret['list'][$key]['music'] = 0;
                }
            }
        }
        $this->ajaxReturn($ret);
    }

    /**
     * @api {get} /api/knowledge/live 知识-热门
     * @apiVersion 1.0.0
     * @apiName knowledge_live
     * @apiGroup api
     *
     * @apiSampleRequest /api/knowledge/live
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Object[]} data.ad 轮播广告
     * @apiSuccess {Object[]} data.anchor 热门主播
     * @apiSuccess {Object[]} data.online 直播中
     * @apiSuccess {Object[]} data.trailer 预告
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "ad": [
     *             {
     *                 "title": "",
     *                 "link": "",
     *                 "image": "/uploads/2018/02/28/35e9694b2fc8a48148d4ac415fa8a30d.jpg"
     *             }
     *         ],
     *         "anchor": [
     *             {
     *                "id": "1",
     *                 "nickname": "aicode",
     *                 "header": "",
     *                 "v": "0"
     *             }
     *         ],
     *         "online": [
     *             {
     *                 "room_id": "4",
     *                 "title": "你的出生地址",
     *                 "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
     *        "play_url": "{\"rtmp\":\"rtmp:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2\",\"flv\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.flv\",\"m3u8\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.m3u8\"}",
     *                 "live_tag_id": "0",
     *                 "anchor_uid": "1",
     *                 "views": "0",
     *                 "nickname": "aicode",
     *                 "v": "0",
     *                 "price": "0.00"
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
    public function live()
    {
        $ret = array();
        //广告图
        $this->load->model('Ad_position_model');
        $ad_position_id = $this->Ad_position_model->init('knowledge', 'live');
        $ret['ad'] = $this->ad($ad_position_id, 8);
        //热门推荐
        $this->load->model('Users_model');
        $order_by = array('sort' => 'desc', 'id' => 'desc');
        $this->db->select('id,nickname,header,v');
        $ret['anchor'] = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by(array('anchor' => 1, 'is_hot' => 1));
        //热门直播
        $this->load->model('Room_model');

        $ret['online'] = array();
        $QLive = new Query();
        $config = config_item('live');
        $QLive->setAppInfo($config['appid'], $config['api_key'], $config['push_key'], $config['bizid']);
        $response = $QLive->Live_Channel_GetLiveChannelList();
        $a_room_id = array();
        if($result = json_decode($response, true)){
            if($result['ret'] == 0 && $result['output']['all_count']){
                foreach($result['output']['channel_list'] as $channel_id){
                    $this->Room_model->set_userid_roomid_by_channel($channel_id);
                    $a_room_id[] = $this->Room_model->room_id;
                    if(count($a_room_id) > 1000){
                        break;
                    }
                }

                $order_by = array('sort' => 'desc', 'id' => 'desc');
                $this->db->select('id as room_id,title,cover_image,play_url,live_tag_id,anchor_uid,views,price');
                $ret['online'] = $this->Room_model->order_by($order_by)->get_many($a_room_id);
            }
        }
        $ret['online'] = $this->live_anchor($ret['online']);
        //预告直播
        $order_by = array('sort' => 'desc', 'id' => 'desc');
        $this->db->select('id as room_id,title,cover_image,play_url,live_tag_id,anchor_uid,views,price');
        $where = array('start_at >' => time());
        !empty($a_room_id) && $this->db->where_not_in('id', $a_room_id);
        $ret['trailer'] = $this->Room_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
        $ret['trailer'] = $this->live_anchor($ret['trailer']);

        $this->ajaxReturn($ret);
    }

    protected function live_anchor($live)
    {
        $a_uid = $a_tag = array();
        if($live){
            foreach($live as $key=>$item){
                $live[$key]['play_url'] = json_decode($item['play_url'], true);
                $a_uid[] = $item['anchor_uid'];
                $item['live_tag_id'] && $a_tag[] = $item['live_tag_id'];
            }

            //主播信息
            $this->db->select('id,nickname,v');
            $user = $this->Users_model->get_many($a_uid);
            $k_user = array();
            foreach($user as $item){
                $key = $item['id'];
                unset($item['id']);
                $k_user[$key] = $item;
            }

            //直播标签
            $k_tag = array();
            if($a_tag){
                $this->load->model('Live_tag_model');
                $this->db->select('id,name as tag_name');
                $tag = $this->Live_tag_model->get_many($a_tag);
                foreach($tag as $item){
                    $key = $item['id'];
                    unset($item['id']);
                    $k_tag[$key] = $item;
                }
            }

            foreach($live as $key=>$item){
                isset($k_user[$item['anchor_uid']]) && $live[$key] = array_merge($live[$key], $k_user[$item['anchor_uid']]);
                isset($k_tag[$item['live_tag_id']]) && $live[$key] = array_merge($live[$key], $k_user[$item['anchor_uid']]);
            }
        }

        return $live;
    }
}
