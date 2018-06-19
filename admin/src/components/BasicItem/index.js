import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Form, Input, Button, Row, Col, Switch, message } from "antd";
import "./BasicItem.less";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
const FormItem = Form.Item;
const { TextArea } = Input;
class BasicItem extends BaseComponent {
    store = {
		list:{},
        editorState: EditorState.createEmpty()
    };
    showProps = [
        { key: "site_name", label: "站点名称" },
        { key: "icp_number", label: "ICP证书号" },
        {
            key: "statistics_code",
            label: "第三方流量统计代码",
            render: value => this.renderTextArea(value)
        },
        {
            key: "rule_grade",
            label: "等级说明",
            render: value => this.renderTextArea(value)
        },
        {
            key: "rule_point",
            label: "积分规则",
            render: value => this.renderTextArea(value)
        },
        { key: "copyright", label: "版权信息" },
        {
            key: "site_status",
            label: "站点状态",
            render: value => this.renderSwitch(value)
        },
        { key: "closed_reason", label: "关闭原因" },
        { key: "phone", label: "客服联系电话" },
        { key: "email", label: "电子邮箱" },
	];
    renderTextArea(value) {
        return <TextArea autosize={{ minRows: 4 }} />;
    }
    renderSwitch(values) {
        return (
            <Switch
                checked={parseInt(values, 10) === 1}
                onChange={value => this.onSwitch(value ? 1 : 0)}
                checkedChildren="开"
                unCheckedChildren="关"
            />
        );
	}
	@action.bound
    onEditorStateChange(editorState) {
        this.store.editorState = editorState;
    }
    onUploadCallback(file) {
        return new Promise((resolve, reject) => {
            getBase64(file, info => {
                Base.POST(
                    {
                        act: "common",
                        op: "base64FileUpload",
                        base64_image_content: encodeURIComponent(info)
                    },
                    res => {
                        resolve({
                            data: { link: Base.getImgUrl(res.data.file_url) }
                        });
                    },
                    null,
                    res => {
                        message.error(res.message);
                        reject();
                    }
                );
            });
        });
    }
    //是否启用
    @action.bound
    onSwitch(value) {
		this.store.list.site_status = value;
    }
    @action.bound
    onSaveBasic() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const content = draftToHtml(
					convertToRaw(this.refs.editor.state.editorState.getCurrentContent())
				);
                values.site_status = values.site_status ? 1 : 0;
                values.goods_explain = content;
                Base.POST(
                    { act: "config", op: "save", mod: "admin", ...values },
                    res => {
                        message.success(res.message);
                    },
                    this
                );
            }
        });
	}
	componentDidMount(){
		Base.GET({act:'config',op:'index',mod:'admin'},(res)=>{
			this.store.list = res.data;
			const contentBlock = htmlToDraft(res.data.goods_explain);
			if (contentBlock) {
				const contentState = ContentState.createFromBlockArray(
					contentBlock.contentBlocks
				);
				const editorState = EditorState.createWithContent(contentState);
				this.store.editorState = editorState;
			}
		},this);
	}
    render() {
		const { list,editorState } = this.store;
        const { getFieldDecorator } = this.props.form;
        const { showProps } = this;
        const items = showProps.map((item, index) => {
			const { key, label, render } = item;
            if (!render) {
                return (
                    <FormItem
                        className="baseForm"
                        key={index}
                        {...formItemLayout}
                        label={label}
                    >
                        {getFieldDecorator(key, {
                            initialValue: list[key]
                        })(<Input placeholder={`请输入${label}`} />)}
                    </FormItem>
                );
            } else {
                return (
                    <FormItem
                        className="baseForm"
                        key={index}
                        {...formItemLayout}
                        label={label}
                    >
                        {getFieldDecorator(key, {
                            initialValue: list[key]
                        })(render(list[key]))}
                    </FormItem>
                );
            }
        });
        return (
            <div className="BasicItem">
                {items}
                <FormItem
                    className="baseForm"
                    {...formItemLayout}
                    label={"价格说明"}
                >
                    <Editor
						ref="editor"
						wrapperClassName="editor-con"
						editorState={editorState}
						onEditorStateChange={this.onEditorStateChange}
						toolbar={{
							image: {
								uploadCallback: this.onUploadCallback,
								previewImage: true
							}
						}}
						localization={{
							locale: "zh"
						}}
					/>
                </FormItem>
                <Row>
                    <Col span={6} />
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => this.onSaveBasic()}
                        >
                            确认提交
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(BasicItem);
