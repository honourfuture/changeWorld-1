import React from "react";
import {
    Card,
    Row,
    Form,
    Input,
    Button,
    Col,
    Upload,
    Icon,
    message
} from "antd";
import { BaseComponent, Base, Global } from "../../common";
import "./BatchAudio.less";
import { action } from "mobx";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};
class CardItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.store = { cover_image: this.props.data.cover_image };
        this.addInfo = [
            {
                key: "video_url",
                label: "音频文件",
                render: (value, data) => {
                    return (
                        <div style={{ width: 150 }}>{`${data.title}.mp3`}</div>
                    );
                }
            },
            { key: "title", label: "标题" },
            { key: "duration", label: "播放时长(秒)" },
            { key: "play_times", label: "播放次数" },
            {
                key: "cover_image",
                label: "封面图",
                render: value => this.onAddImage("cover_image", value)
            },
            { key: "price", label: "门票价格" },
            { key: "city_partner_rate", label: "城市分销比例(%)" },
            { key: "two_level_rate", label: "加盟商分销比例(%)" }
        ];
    }
    @action.bound
    onUploadChange(info, key) {
        console.log(info);
        if (info.file.status === "done" || info.file.status === "removed") {
            const { data } = this.props;
            const { fileList } = info;
            const value =
                fileList.length > 0 ? fileList[0].response.data.file_url : "";
            this.store[key] = value;
            data[key] = value;
        }
    }
    onAddImage(key, value) {
        let fileName = "";
        if (value) {
            const arr = value.split("/");
            fileName = arr[arr.length - 1];
        }
        return (
            <div>
                <Upload
                    name="field"
                    data={{ field: "field" }}
                    action={Global.UPLOAD_URL}
                    showUploadList={false}
                    onChange={e => this.onUploadChange(e, key)}
                >
                    {value ? (
                        <div
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <span>{fileName.slice(20)}</span>
                            <Icon
                                onClick={action(e => {
                                    this.props.data[key] = "";
                                    e.stopPropagation();
                                })}
                                style={{ marginLeft: 20 }}
                                type="close"
                                theme="outlined"
                            />
                        </div>
                    ) : (
                        <Button>
                            <Icon type="upload" /> 点击上传
                        </Button>
                    )}
                </Upload>
            </div>
        );
    }
    render() {
        const { data } = this.props;
        const items = this.addInfo.map((item, index) => {
            const { label, key, render } = item;
            return (
                <FormItem key={index} {...formItemLayout} label={`${label}：`}>
                    {render ? (
                        render(data[key], data)
                    ) : (
                        <Input
                            placeholder={`请输入${label}`}
                            value={data[key]}
                            onChange={action(
                                e => (this.props.data[key] = e.target.value)
                            )}
                        />
                    )}
                </FormItem>
            );
        });
        return (
            <Card style={{ width: 350, marginRight: 10, marginBottom: 10 }}>
                {items}
            </Card>
        );
    }
}
export default class BatchAudio extends BaseComponent {
    store = { list: [] };
    @action.bound
    componentDidMount() {
        this.store.list = (Global.audioList || []).map(item => {
            return {
                album_id: Base.getPageParams("album_id"),
                duration: Base.getNumFormat(item.playtime_seconds, 0),
                cover_image: item.cover_image,
                title: item.name,
                price: "0",
                city_partner_rate: "0",
                two_level_rate: "0",
                video_url: item.file_url,
                play_times: "0",
                deleted: "0",
                enable: "1"
            };
        });
        console.log(this.store.list);
        Global.audioList = [];
    }
    @action.bound
    onSave() {
        const list = this.store.list.slice();
        let tips = "";
        for (let i = 0; i < list.length; i++) {
            const { cover_image, title, duration } = list[i];
            if (!cover_image || !title || !duration) {
                tips = "请输入完整信息";
                break;
            }
        }
        if (tips) {
            return message.error(tips);
        }
        Base.POST(
            {
                act: "live_audio",
                op: "add_batch",
                mod: "user",
                j_audio: JSON.stringify(list)
            },
            res => {
                Base.goBack();
            }
        );
    }
    render() {
        const { list } = this.store;
        const items = list.map((item, index) => {
            return <CardItem key={index} data={item} />;
        });
        return (
            <div className="BatchAudio">
                <Row type="flex">{items}</Row>
                <Row gutter={24}>
                    <Col>
                        <Button
                            className="saveBtn"
                            type="default"
                            onClick={() => Base.goBack()}
                        >
                            返回
                        </Button>
                        <Button
                            className="saveBtn"
                            type="primary"
                            onClick={() => this.onSave()}
                        >
                            保存
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
