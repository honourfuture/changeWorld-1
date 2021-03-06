<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Mailbox extends API_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Mailbox_model');
    }

    /**
     * @api {get} /api/mailbox/reddot 站内信-红点
     * @apiVersion 1.0.0
     * @apiName mailbox_reddot
     * @apiGroup api
     *
     * @apiSampleRequest /api/mailbox/reddot
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {String} data.reddot 0无 1有
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "reddot": 0
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function reddot()
    {
        $reddot = $this->user_id ? $this->Mailbox_model->reddot($this->user_id) : 0;
        $ret = ['reddot' => $reddot];
        $this->ajaxReturn();
    }

    /**
     * @api {get} /api/mailbox 站内信-列表
     * @apiVersion 1.0.0
     * @apiName mailbox
     * @apiGroup api
     *
     * @apiSampleRequest /api/mailbox
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {String} data.read_ids 阅读记录ID集 ,1,2,
     * @apiSuccess {String} data.count 文章数量
     * @apiSuccess {Object[]} data.list 接口数据集
     * @apiSuccess {String} data.list.id 唯一ID
     * @apiSuccess {String} data.list.title 标题
     * @apiSuccess {String} data.list.summary 标摘要题
     * @apiSuccess {String} data.list.updated_at 发布时间
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "count": 2,
     *         "list": [
     *             {
     *                 "id": "16",
     *                 "title": "测试",
     *                 "summary": "",
     *                 "updated_at": "2018-01-26 17:47:49"
     *             },
     *             {
     *                 "id": "15",
     *                 "title": "这是一条站内信",
     *                 "summary": "",
     *                 "updated_at": "2018-01-23 19:31:19"
     *             }
     *         ],
     *         "read_ids": ",15,14,5,1,11,16,"
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function index()
    {
        $ret = array('count' => 0, 'list' => array(), 'read_ids' => '');

        $where = array();
        if($this->user_id){
            $this->load->model('Users_read_model');
            $info = $this->Users_read_model->get_by(array('user_id' => $this->user_id, 'type' => 1));
            $info && $ret['read_ids'] = $info['ids'];

            $where['enable'] = 1;
            $select = 'id,title,summary,updated_at';
        }else{
            $deleted = (int)$this->input->get('deleted');
            $where['deleted'] = $deleted;
            $select = 'id,title,created_at,updated_at,enable,sort,summary';
        }

        $this->search();
        $ret['count'] = $this->Mailbox_model->count_by($where);
        if($ret['count']){
            $order_by = array('sort' => 'desc', 'id' => 'desc');
            $this->search();
            $this->db->select($select);
            $list = $this->Mailbox_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
            foreach ($list as $k=>$v){
                $v['updated_at'] = date('Y-m-d', strtotime($v['updated_at']));
                $list[$k] = $v;
            }
            $ret['list'] = $list;
        }

        $this->ajaxReturn($ret);
    }

    protected function search()
    {
        
    }

    /**
     * @api {get} /api/mailbox/view 站内信-查看
     * @apiVersion 1.0.0
     * @apiName mailbox_view
     * @apiGroup api
     *
     * @apiSampleRequest /api/mailbox/view
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 站内信ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object[]} data 接口数据集
     * @apiSuccess {String} data.id 消息唯一ID
     * @apiSuccess {String} data.title 消息标题
     * @apiSuccess {String} data.title 消息摘要
     * @apiSuccess {String} data.content 消息详情
     * @apiSuccess {String} data.summary 标摘要题
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "id": "16",
     *         "updated_at": "2018-01-26 17:47:49",
     *         "title": "测试",
     *         "content": "<p>这是一条站内信</p>\n",
     *         "summary": ""
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function view()
    {
        $id = (int)$this->input->get_post('id');
        $this->db->select('id,updated_at,title,content,summary');
        if($info = $this->Mailbox_model->get($id)){
            $this->load->model('Users_read_model');
            $this->Users_read_model->save($this->user_id, 1, $id);
        }

        $this->ajaxReturn($info);
    }

    /**
     * @api {post} /api/mailbox/save 站内信-编辑 OR 新增
     * @apiVersion 1.0.0
     * @apiName mailbox_save
     * @apiGroup admin
     *
     * @apiSampleRequest /api/mailbox/save
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
     * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
     * @apiParam {Number} sort 排序 降序排列
     * @apiParam {Number} enable 启用 1是 0否
     * @apiParam {String} title 消息标题
     * @apiParam {String} summary 消息摘要
     * @apiParam {String} content 消息详情
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {String} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *        "data": "",
     *        "status": 0,
     *        "message": ""
     *    }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function save()
    {
        $this->check_operation();
        $id = (int)$this->input->get_post('id');
        if($id){
            $params = elements(
                array(
                    'sort', 'title', 'summary', 'content', 'deleted', 'enable'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('edit', $params);
            if($params['deleted'] == 1){
                $update = array('deleted' => 1, 'enable' => 0);
                $flag = $this->Mailbox_model->update_by(array('id' => $id), $update);
            }else{
                unset($params['deleted']);
                if(isset($params['enable']) && $params['enable']){
                    $params['deleted'] = 0;
                }
                $flag = $this->Mailbox_model->update_by(array('id' => $id), $params);
            }
        }else{
            $params = elements(
                array(
                    'sort', 'title', 'summary', 'content'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('add', $params);
            if($flag = $this->Mailbox_model->insert($params)){
                $id = $flag;
            }
        }

        if($flag){
            $status = 0;
            $message = '成功';
        }else{
            $status = 1;
            $message = '失败';
        }
        $this->ajaxReturn(array('id' => $id), $status, '操作'.$message);
    }

    protected function check_params($act, $params)
    {
        switch($act){
            case 'add':
                if($params['title'] === '' || $params['title'] == UPDATE_VALID){
                    $this->ajaxRetitleturn('', 501, '输入消息标题');
                }
                break;
            case 'edit':
                break;
        }
    }
}
