import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import LoginForm from '../containers/LoginForm';
import LogoutView from '../containers/LogoutView';
import RegisterForm from '../containers/RegisterForm';
import Todos from '../containers/Todos';

function mapStateToProps(state: any) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
}

const Routes = ({ authenticated }: any) => {
    const HomePage = () => <div>Home Page</div>;
    const PotentialTodos = () =>
        authenticated ? <Todos /> : <Redirect to="/login" />;
    const NotFound = () => <div>Not Found</div>;
    return (
        <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LogoutView} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/todos" component={PotentialTodos} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default withRouter<any>(connect(mapStateToProps)(Routes));
