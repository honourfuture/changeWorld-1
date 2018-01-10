import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DocumentTitle from 'react-document-title';
import { panelsList, getPanelName } from './panels';
import 'normalize.css';
import './App.less';

class Panels extends Component {
	render() {
		const {location} = this.props;
		return (
			<DocumentTitle title={getPanelName(location.pathname)}>
				<Switch>
				{
					panelsList.map(item =>
						<Route path={item.path} exact key={item.path} component={item.component} />
					)
				}
				<Redirect exact from="/" to="/ShopIndex" />
				</Switch>
			</DocumentTitle>
		)
	}
}

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<Router ref={(router)=>window.Router = router}>
					<Route path="/" render={props => <Panels {...props} />} /> 
				</Router>
			</div>
		);
	}
}
