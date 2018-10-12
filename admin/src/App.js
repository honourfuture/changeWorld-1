import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { BasicLayout } from "./layouts/BasicLayout";
import { UserLayout } from "./layouts/UserLayout";
import { BlankLayout } from "./layouts/BlankLayout";

class App extends Component {
    render() {
        return (
            <Router ref={router => (window.Router = router)}>
                <Switch>
                    <Route
                        path="/user"
                        render={props => <UserLayout {...props} />}
                    />
                    <Route
                        path="/blank"
                        render={props => <BlankLayout {...props} />}
                    />
                    <Route
                        path="/"
                        render={props => <BasicLayout {...props} />}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
