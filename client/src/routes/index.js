import React from 'react';
import { Route, Switch, withRouter } from 'react-router';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={() => <div>Home Page</div>} />
        <Route path="/login" component={() => <div>Login Form</div>} />
        <Route path="/logout" component={() => <div>Logout</div>} />
        <Route path="/register" component={() => <div>Login Form</div>} />
        <Route component={() => <div>Not Found</div>} />
    </Switch>
);

export default withRouter(Routes);
