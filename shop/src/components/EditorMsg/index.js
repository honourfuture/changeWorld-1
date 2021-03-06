import React from "react";
import { action } from "mobx";
import { Modal, message, Input, Row, Col } from "antd";
import { BaseComponent, Base } from "../../common";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./EditorMsg.less";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

export class EditorMsg extends BaseComponent {
    store = { isAdd: false, editorState: EditorState.createEmpty() };
    @action.bound
    show(content, id) {
        this.store.isAdd = true;
        this.curId = id;

        const html = content || "";
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            this.store.editorState = editorState;
        }
    }
    @action.bound
    hide() {
        this.store.isAdd = false;
    }
    @action.bound
    onModalOk() {
        this.hide();
        const content = draftToHtml(
            convertToRaw(this.refs.editor.state.editorState.getCurrentContent())
        );
        const { onComplete } = this.props;
        onComplete && onComplete(content, this.msgTit, "");
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
    render() {
        const { isAdd, editorState } = this.store;
        return (
            <Modal
                className="EditorMsg"
                title="新增消息"
                visible={isAdd}
                onOk={this.onModalOk}
                onCancel={this.hide}
                okText="保存"
                cancelText="取消"
                closable={false}
                maskClosable={false}
                width="60%"
            >
                <Row>
                    <Col span={4} style={{ lineHeight: "32px", width: 42 }}>
                        标题：
                    </Col>
                    <Col span={20}>
                        <Input
                            onChange={e => (this.msgTit = e.target.value)}
                            placeholder="请输入标题"
                        />
                    </Col>
                </Row>
                <div className="msgTit" />
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
            </Modal>
        );
    }
}
