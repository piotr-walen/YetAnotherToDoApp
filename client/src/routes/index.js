import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import LoginForm from '../containers/LoginForm';
import RegisterForm from '../containers/RegisterForm';
import LogoutView from '../containers/LogoutView';
import { connect } from 'react-redux';
import Todos from '../containers/Todos';

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
}

const Routes = ({ authenticated }) => (
    <Switch>
        <Route exact path="/" component={() => <div>Home Page</div>} />
        <Route path="/login" component={props => <LoginForm {...props} />} />
        <Route path="/logout" component={props => <LogoutView {...props} />} />
        <Route
            path="/register"
            component={props => <RegisterForm {...props} />}
        />
        <Route
            path="/todos"
            component={props =>
                authenticated ? <Todos /> : <Redirect to="/login" />
            }
        />
        <Route component={() => <div>Not Found</div>} />
    </Switch>
);

export default withRouter(connect(mapStateToProps)(Routes));
