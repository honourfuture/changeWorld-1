<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Article extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Article_model');
    }

    /**
	 * @api {get} /api/article 文章-列表
	 * @apiVersion 1.0.0
	 * @apiName article
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/article
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} article_class_id 文章类ID 0表示所有
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.count 文章数量
	 * @apiSuccess {Object[]} data.list 接口数据集
	 * @apiSuccess {String} data.list.id 文章唯一ID
	 * @apiSuccess {String} data.list.title 文章标题
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "title": "热门"
	 *	        },
	 *	        {
	 *	            "id": "2",
	 *	            "title": "靓号"
	 *	        }
	 *	    ],
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function index()
	{
		$ret = array('count' => 0, 'list' => array());

		$where = array('alias' => '');//过滤单页
		$article_class_id = (int)$this->input->get('article_class_id');
		if($article_class_id){
			$where['article_class_id'] = $article_class_id;
		}

		if($this->user_id){
			$where['enable'] = 1;
			$this->db->select('id,title');
		}else{
			$deleted = (int)$this->input->get('deleted');
			$where['deleted'] = $deleted;
			$this->db->select('id,title,created_at,updated_at,deleted,enable,sort,article_class_id');
		}

		$this->search();
		$ret['count'] = $this->Article_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			$this->search();
			$ret['list'] = $this->Article_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		
	}

	/**
	 * @api {get} /api/article/view 文章-查看
	 * @apiVersion 1.0.0
	 * @apiName article_view
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/article/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 文章ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 文章唯一ID
	 * @apiSuccess {String} data.title 文章标题
	 * @apiSuccess {String} data.content 文章详情
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "id": "1",
	 *	        "title": "热门",
	 *	        "content": "热门"
	 *	    },
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function view()
	{
		$id = (int)$this->input->get('id');
		$this->db->select('id,updated_at,title,content');
		$info = $this->Article_model->get($id);

		$this->ajaxReturn($info);
	}

	/**
	 * @api {get} /api/article/page 文章-单页
	 * @apiVersion 1.0.0
	 * @apiName article_page
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/article/page
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集 键名既是别名参数alias
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "about_us": "关于我们",
	 *         "join_us": "加入我们",
	 *         "contact_us": "联系我们",
	 *         "protocol": "用户协议",
	 *         "copyright": "版权申明"
	 *     },
	 *     "status": 0,
	 *     "message": "成功"
	 * }
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function page()
	{
		$this->check_operation();

		$ret = array('single_page' => array(), 'default_page' => array());
		$ret['single_page'] = $this->Article_model->initSinglePage();
		$a_alias = array_keys($ret['single_page']);
		$ret['default_page'] = $this->single_page($a_alias[0]);

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/article/page_view 文章-单页查看
	 * @apiVersion 1.0.0
	 * @apiName article_page_view
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/article/page_view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} alias 别名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 文章唯一ID
	 * @apiSuccess {String} data.title 文章标题
	 * @apiSuccess {String} data.content 文章详情
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "id": "1",
	 *	        "title": "热门",
	 *	        "content": "热门"
	 *	    },
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function page_view()
	{
		$alias = trim($this->input->get('alias'));
		if(empty($alias)){
			$this->ajaxReturn('', 1, '查看单页参数错误');
		}
		$info = $this->single_page($alias);

		$this->ajaxReturn($info);
	}

	protected function single_page($alias)
	{
		$this->db->select('id,updated_at,title,content');
		return $this->Article_model->get_many_by('alias', $alias);
	}

	/**
	 * @api {post} /api/article/save 文章-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName article_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/article/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} title 文章标题
	 * @apiParam {Number} article_class_id 文章文章类ID
	 * @apiParam {String} content 文章标题
	 * @apiParam {String} alias 别名 发布文章为空 单页需要传递
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
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
					'title', 'sort', 'deleted', 'enable', 'article_class_id', 'content', 'alias'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Article_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Article_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'title', 'sort', 'article_class_id', 'content', 'alias'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Article_model->insert($params)){
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
					$this->ajaxReturn('', 501, '标题参数错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
