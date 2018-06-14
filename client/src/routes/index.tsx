import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import * as status from '../actions/status';
import HomePage from '../components/HomePage';
import LoginForm from '../containers/LoginForm';
import LogoutView from '../containers/LogoutView';
import RegisterForm from '../containers/RegisterForm';
import Todos from '../containers/Todos';
import { IState } from '../types';
const mapStateToProps = (state: IState) => {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearStatus: () => {
            dispatch(status.clear());
        },
    };
};

const Routes = ({ authenticated, clearStatus }: any) => {
    const PotentialTodos = () =>
        authenticated ? <Todos /> : <Redirect to="/login" />;
    const NotFound = () => <div>Not Found</div>;
    return (
        <Switch>
            <Route
                exact={true}
                path="/"
                component={HomePage}
                onEnter={clearStatus}
            />
            <Route path="/login" component={LoginForm} onEnter={clearStatus} />
            <Route
                path="/logout"
                component={LogoutView}
                onEnter={clearStatus}
            />
            <Route
                path="/register"
                component={RegisterForm}
                onEnter={clearStatus}
            />
            <Route
                path="/todos"
                component={PotentialTodos}
                onEnter={clearStatus}
            />
            <Route component={NotFound} />
        </Switch>
    );
};

export default withRouter<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Routes),
);
