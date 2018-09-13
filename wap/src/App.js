import React, { Component } from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import DocumentTitle from "react-document-title";
import { panelsList, getPanelName } from "./panels";
import "normalize.css";
import QueueAnim from "rc-queue-anim";

class Panels extends Component {
    render() {
        const { location } = this.props;
        return (
            <DocumentTitle title={getPanelName(location.pathname)}>
                <Switch>
                    {panelsList.map(item => (
                        <Route
                            path={item.path}
                            exact
                            key={item.path}
                            render={() => (
                                <QueueAnim type="left" leaveReverse={true}>
                                    {<item.component key={item.path} />}
                                </QueueAnim>
                            )}
                        />
                    ))}
                    <Redirect exact from="/" to="/ShopIndex" />
                </Switch>
            </DocumentTitle>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Router ref={router => (window.Router = router)}>
                    <Route path="/" render={props => <Panels {...props} />} />
                </Router>
            </div>
        );
    }
}
