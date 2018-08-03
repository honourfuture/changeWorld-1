import React from 'react';
import { action } from "mobx";
import {BaseComponent,Base,Global} from '../../common';
import {
	Table,
	Upload,
	Button,
	Input,
	Spin,
	Select,
	message,
	Switch,
	Icon
} from "antd";
import './DirectManager.less';
const Option = Select.Option;
const Search = Input.Search;

export default class DirectManager extends BaseComponent{
	listStatus = [
		{
			name:'直播中',
			value:'1'
		},
		{
			name:'结束',
			value:'0'
		}
	];
	store = {
		list: [],
		status: -1,
        total: 1,
        isShowModal: false,
		params: {},
	};
	constructor(props){
		super(props);
		this.columns = [
			{
                title: "房间ID",
                dataIndex: "id",
				render: (text, record) => 
					this.renderText(text, record, "id")
			},
			{
                title: "房间名称",
                dataIndex: "title",
				render: (text, record) => 
					this.renderText(text, record, "title")
			},
            {
                title: "主播ID",
                dataIndex: "anchor_uid",
                render: (text, record) => this.renderText(text, record, "anchor_uid")
			},
			{
                title: "主播昵称",
                dataIndex: "nickname",
				render: (text, record) => 
					this.renderText(
						this.user ? this.user[record.anchor_uid].nickname : '', 
						record, 
						"nickname"
					)
			},
			{
                title: "手机号",
                dataIndex: "mobi",
				render: (text, record) => 
					this.renderText(
						this.user ? this.user[record.anchor_uid].mobi : '', 
						record, 
						"mobi"
					)
			},
			{
                title: "头像",
                dataIndex: "header",
				render: (text, record) => 
					this.renderImage(
						this.user ? this.user[record.anchor_uid].header : '', 
						record, 
						"header"
					)
			},
			{
                title: "直播状态",
                dataIndex: "status",
				render: (text, record) => 
					this.renderText(
						parseInt(text) === 1 ? '直播中' : '结束', 
						record, 
						"status"
					)
			},
			{
                title: "更新时间",
                dataIndex: "updated_at",
                render: (text, record) => this.renderText(text, record, "updated_at")
			},
			{
				title: '开启/关闭自动聊天',
				dataIndex: 'chat_stop',
				render: (text, record) => this.renderSwitch(text, record, 'chat_stop'),
			}, 
            {
                title: "聊天文件操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { id } = record;
                    return (
                        <div className="editable-row-operations">
							<Upload
								accept="txt"
								name="field"
								data={{ field: "field" }}
								showUploadList={false}
								action={Global.UPLOAD_URL}
								onChange={e => this.onUploadChange(e,id)}
							>
								<Button>
									<Icon type="upload" /> txt上传
								</Button>
							</Upload>
                        </div>
                    );
                }
            }
        ];
	}
	renderText(text, record, column) {
        return <div>{text}</div>;
	}
	renderImage(text, record, column){
		return <div>
			{
				text ? <img
							src={Base.getImgUrl(text)}
							className="photo"
							alt=""
						/> : null
			}
		</div>
	}
	renderSwitch(text,record,column){
		return (
			<Switch checked={parseInt(record.chat_stop,10)===0} onChange={(value)=>this.onSwitch(record.id,value?0:1,column)} />
		)
	}
	//是否启用
	@action.bound
	onSwitch(id,value,column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.onSave(id);
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		Base.POST({act:'room',op:'chat_stop',mod:'admin',id:id,val:itemData.chat_stop},(res)=>{
			// itemData.editable = false;
			itemData.updated_at = Base.getTimeFormat(new Date().getTime()/1000,2);
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	@action.bound
    onUploadChange(info,id) {
        if (info.file.status === "uploading") {
            return false;
        }
        if (info.file.status === "done") {
            Base.GET(
                {
                    act: "room",
                    op: "chat_file",
					mod: "admin",
					id:id,
                    filename: info.file.response.data.file_url
                },
                res => {
                    this.cur_page = 1;
					this.requestData();
					message.success(res.message);
                },
                this
            );
            return false;
        }
    }
	@action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
	current = 1;
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "room",
                op: "index",
				mod: "admin",
				type:this.searchType || 'uid',
				keyword: this.searchStr || '',
				status: this.store.status,
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, user, count } = res.data;
                this.store.list = list;
                this.user = user;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
	}
	@action.bound
    onStatusSelect(e) {
        this.current = 1;
        this.store.status = e;
        this.requestData();
	}
	//搜索
    searchType = ""; //搜索类型
    searchStr = "";
    @action.bound
    onSearch(value) {
        this.current = 1;
        this.searchStr = value;
        this.requestData();
    }
	render(){
		let { list, total, isShowModal, params } = this.store;
		const showList = list.slice();
		const statusCon = [];
		this.listStatus.map((item,key) => {
			statusCon.push(
				<Option key={key} value={item.value}>
                    {item.name}
                </Option>
			)
		});
		statusCon.unshift(
            <Option value={-1} key={-1}>
                全部
            </Option>
        );
		return (
			<div className='DirectManager'>
				<div className="pb10">
					<Select
                        defaultValue={'uid'}
                        onChange={value =>
                            this.searchType = value
                        }
                    >
                        <Option value='uid'>
                            {"主播ID"}
                        </Option>
                        <Option value='title'>
                            {"标题"}
                        </Option>
                    </Select>
					<Search
                        placeholder="搜索主播ID/房间名称"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
					&nbsp;&nbsp;
					状态筛选：
                    {statusCon.length > 0 ? (
                        <Select
                            onChange={this.onStatusSelect}
                            defaultValue={-1}
                        >
                            {statusCon}
                        </Select>
                    ) : null}
                </div>
				<Table
                    size="small"
                    className="mt16"
                    onChange={this.onTableHandler}
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={{
                        total,
                        current: this.current,
                        defaultPageSize: Global.PAGE_SIZE
                    }}
                />
			</div>
		)
	}
};
