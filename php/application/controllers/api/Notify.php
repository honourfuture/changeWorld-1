<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 异步通知
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

use QCloud\Live\Query;
class Notify extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function live()
    {
        $content = file_get_contents("php://input");
        log_message('error', '[notify live content] '.$content);
        if($data = json_decode($content, true)){
            //签名校验
            $channel_id = isset($data['channel_id']) ? $data['channel_id'] : $data['stream_id'];
            $this->load->model('Room_model');
            $this->Room_model->set_userid_roomid_by_channel($channel_id);
            $room_id = $this->Room_model->room_id;
            log_message('error', '[notify live room_id] '.$room_id);
            switch($data['event_type']){
                case 0://断流
                    break;
                case 1://推流
                    break;
                case 100://新的录制文件已生成
                    if($data['duration'] > 300){
                        $this->load->model('Room_audio_model');
                        $insert = elements(
                            array(
                                'duration', 'start_time', 'end_time', 'file_id', 'file_size',
                                'video_id', 'video_url'
                            ),
                            $data,
                            UPDATE_VALID
                        );
                        $insert['room_id'] = $room_id;
                        $insert['anchor_uid'] = $this->Room_model->user_id;

                        $this->Room_audio_model->insert($insert);
                    }
                    break;
                case 200://新的截图文件已生成
                    break;
            }

            echo json_encode(array('code' => 0));
        }
    }
}
