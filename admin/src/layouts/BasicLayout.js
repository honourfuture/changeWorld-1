/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:40:48 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:47:07
 * 基础布局
 */

import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import NotFound from '../panels/Exception/404';
import { GlobalHeader } from '../common/GlobalHeader';
import { GlobalMenu, redirectData } from '../common/GlobalMenu';
import { GlobalFooter } from '../common/GlobalFooter';
import { panelsList, getPanelName } from '../panels';
const { Content } = Layout;
const query = {
	'screen-xs': {
		maxWidth: 575,
	},
	'screen-sm': {
		minWidth: 576,
		maxWidth: 767,
	},
	'screen-md': {
		minWidth: 768,
		maxWidth: 991,
	},
	'screen-lg': {
		minWidth: 992,
		maxWidth: 1199,
	},
	'screen-xl': {
		minWidth: 1200,
	},
};
export class BasicLayout extends React.PureComponent {
	render() {
		const { location } = this.props;
		const layout = (
			<Layout>
				<GlobalMenu location={location}/>
				<Layout>
					<GlobalHeader />
					<Content style={{ margin: '24px 24px 0', height: '100%' }}>
						<div style={{ minHeight: 'calc(100vh - 260px)' }}>
							<Switch>
								{
									redirectData.map(item =>
										<Redirect key={item.from} exact from={item.from} to={item.to} />
									)
								}
								{
									panelsList.map(item =>
										<Route path={item.path} exact key={item.path} component={item.component} />
									)
								}
								<Redirect exact from="/" to="/dashboard/analysis" />
								<Route render={NotFound} />
							</Switch>
						</div>
						<GlobalFooter/>
					</Content>
				</Layout>
			</Layout>
		);
		return (
			<DocumentTitle title={getPanelName(location.pathname)}>
				<ContainerQuery query={query}>
					{params => <div className={classNames(params)}>{layout}</div>}
				</ContainerQuery>
			</DocumentTitle>
		);
  }
}