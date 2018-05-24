import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import LoginForm from '../containers/LoginForm';
import RegisterForm from '../containers/RegisterForm';
import LogoutView from '../containers/LogoutView';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={() => <div>Home Page</div>} />
        <Route path="/login" component={props => <LoginForm {...props} />} />
        <Route path="/logout" component={props => <LogoutView {...props} />} />
        <Route
            path="/register"
            component={props => <RegisterForm {...props} />}
        />
        <Route component={() => <div>Not Found</div>} />
    </Switch>
);

export default withRouter(Routes);
