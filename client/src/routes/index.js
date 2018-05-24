import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import LoginForm from '../containers/LoginForm';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={() => <div>Home Page</div>} />
        <Route path="/login" component={props => <LoginForm {...props} />} />
        <Route path="/logout" component={() => <div>Logout</div>} />
        <Route path="/register" component={() => <div>Login Form</div>} />
        <Route component={() => <div>Not Found</div>} />
    </Switch>
);

export default withRouter(Routes);
