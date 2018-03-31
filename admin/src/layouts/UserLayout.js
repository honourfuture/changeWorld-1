/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:41:25 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:47:14
 * 用户模块布局
 */

import React from "react";
import { Link, Route, Redirect, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { GlobalFooter } from "../common/GlobalFooter";
import "./UserLayout.less";
import logo from "../images/logo.png";
import { panelsList, getPanelName } from "../panels";
import NotFound from "../panels/Exception/404";
export class UserLayout extends React.PureComponent {
    render() {
        const { location } = this.props;
        return (
            <DocumentTitle title={getPanelName(location.pathname)}>
                <div className="userLayout">
                    <div className="top">
                        <div className="header">
                            <img alt="logo" className="logo" src={logo} />
                            <span className="title">猪买单</span>
                        </div>
                        <div className="desc">猪买单 打造最好的直播平台</div>
                    </div>
                    <Switch>
                        <Redirect exact from="/user" to="/user/login" />
                        {panelsList.map(item => (
                            <Route
                                path={item.path}
                                key={item.path}
                                component={item.component}
                            />
                        ))}
                        <Route render={NotFound} />
                    </Switch>
                    <GlobalFooter />
                </div>
            </DocumentTitle>
        );
    }
}
