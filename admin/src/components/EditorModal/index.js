import React from 'react';
import { action } from "mobx";
import {Modal,message} from 'antd';
import {BaseComponent,Base} from '../../common';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertToRaw,ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditorModal.less';

const getBase64 = (img, callback)=>{
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

export class EditorModal extends BaseComponent{
	store={isEdit:false,editorState:EditorState.createEmpty()}
	@action.bound
	show(content,id){
		this.store.isEdit = true;
		this.curId = id;

		const html = content || '';
		const contentBlock = htmlToDraft(html);
		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			this.store.editorState = editorState;
		}
	}
	@action.bound
	hide(){
		this.store.isEdit = false;
	}
	@action.bound
	onModalOk(){
		this.hide();
		const content = draftToHtml(convertToRaw(this.refs.editor.state.editorState.getCurrentContent()));
		const {onComplete} = this.props;
		onComplete && onComplete(content,this.curId);
	}
	@action.bound
	onEditorStateChange(editorState){
		this.store.editorState = editorState;
	}
	onUploadCallback(file){
		return new Promise(
			(resolve, reject) => {
				getBase64(file,(info)=>{
					Base.POST({act:'common',op:"base64FileUpload",'base64_image_content':info},(res)=>{
						resolve({data:{link:res.data.file_url}});
					},null,(res)=>{
						message.error(res.message);
						reject();
					});
				})
			}
		);
	}
	render(){
		const {isEdit,editorState} = this.store;
		return (
			<Modal 
				className='editor-modal' 
				title="" 
				visible={isEdit}
				onOk={this.onModalOk} 
				onCancel={this.hide}
				okText='保存'
				cancelText='取消'
				maskClosable={false}
				width='60%'
				>
				<Editor ref='editor'
					wrapperClassName='editor-con'
					editorState={editorState}
					onEditorStateChange={this.onEditorStateChange}
					toolbar={{
						'image':{
							uploadCallback:this.onUploadCallback,
							previewImage:true,
						},
						options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
					}}
					localization={{
						locale: 'zh',
					}}
				/>
			</Modal>
		)
	}
};
