import React, { Component } from "react";
import { Form, Input, Tabs, Button, Icon, Alert, message } from "antd";
import { Base, Global } from "../../common";
import "./Login.less";

const FormItem = Form.Item;
const { TabPane } = Tabs;

@Form.create()
export default class Login extends Component {
    state = {
        count: 0,
        type: "account",
        login: {
            status: "",
            type: "",
            submitting: false
        }
    };
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    onSwitch = type => {
        this.setState({ type });
    };
    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err, values) => {
            if (!err) {
                const { type } = this.state;
                this.setState({ login: { submitting: true, type } });
                Base.GET(
                    {
                        act: "login",
                        op: "index",
                        mod: "user",
                        anchor: 1,
                        ...values
                    },
                    res => {
                        const { auth, account, header } = res.data;
                        Base.setLocalData("shop.verifyData", auth);
                        Global.userInfo = {
                            account,
                            header: header || Global.userInfo.header
                        };
                        this.setState({ login: { submitting: false, type } });
                        Base.push("/");
                    },
                    null,
                    res => {
                        message.error(res.message);
                        this.setState({ login: { submitting: false, type } });
                    }
                );
            }
        });
    };
    renderMessage = message => {
        return (
            <Alert
                style={{ marginBottom: 24 }}
                message={message}
                type="error"
                showIcon
            />
        );
    };
    render() {
        const { login } = this.state;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { type } = this.state;
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Tabs
                        animated={false}
                        className="tabs"
                        activeKey={type}
                        onChange={this.onSwitch}
                    >
                        <TabPane tab="账户密码登录" key="account">
                            {login.status === "error" &&
                                login.type === "account" &&
                                login.submitting === false &&
                                this.renderMessage("账户或密码错误")}
                            <FormItem>
                                {getFieldDecorator("account", {
                                    rules: [
                                        {
                                            required: type === "account",
                                            message: "请输入账户名！"
                                        }
                                    ]
                                })(
                                    <Input
                                        size="large"
                                        prefix={
                                            <Icon
                                                type="user"
                                                className="prefix-icon"
                                            />
                                        }
                                        placeholder="请输入账户名"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: type === "account",
                                            message: "请输入密码！"
                                        }
                                    ]
                                })(
                                    <Input
                                        size="large"
                                        prefix={
                                            <Icon
                                                type="lock"
                                                className="prefix-icon"
                                            />
                                        }
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                )}
                            </FormItem>
                        </TabPane>
                        {/* <TabPane tab="手机号登录" key="mobile">
					{
						login.status === 'error' &&
						login.type === 'mobile' &&
						login.submitting === false &&
						this.renderMessage('验证码错误')
					}
						<FormItem>
							{getFieldDecorator('mobile', {
							rules: [{
								required: type === 'mobile', message: '请输入手机号！',
							}, {
								pattern: /^1\d{10}$/, message: '手机号格式错误！',
							}],
							})(
							<Input
								size="large"
								prefix={<Icon type="mobile" className='prefix-icon' />}
								placeholder="手机号"
							/>
							)}
						</FormItem>
						<FormItem>
							<Row gutter={8}>
							<Col span={16}>
								{getFieldDecorator('captcha', {
								rules: [{
									required: type === 'mobile', message: '请输入验证码！',
								}],
								})(
								<Input
									size="large"
									prefix={<Icon type="mail" className='prefix-icon' />}
									placeholder="验证码"
								/>
								)}
							</Col>
							<Col span={8}>
								<Button
								disabled={count}
								className='get-captcha'
								size="large"
								onClick={this.onGetCaptcha}
								>
								{count ? `${count} s` : '获取验证码'}
								</Button>
							</Col>
							</Row>
						</FormItem>
					</TabPane> */}
                    </Tabs>
                    <FormItem className="additional">
                        {/* {getFieldDecorator('remember', {
					valuePropName: 'checked',
					initialValue: true,
					})(
					<Checkbox className='autoLogin'>自动登录</Checkbox>
					)} */}
                        {/* <a className='forgot' href="">忘记密码</a> */}
                        <Button
                            size="large"
                            loading={login.submitting || false}
                            className="submit"
                            type="primary"
                            htmlType="submit"
                        >
                            登录
                        </Button>
                    </FormItem>
                </Form>
                {/* <div className='other'>
				其他登录方式
				<span className='icon-alipay' />
				<span className='icon-taobao' />
				<span className='icon-weibo' />
				<Link className='register' to="/user/register">注册账户</Link>
			</div> */}
            </div>
        );
    }
}
