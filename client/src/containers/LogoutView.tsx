import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import * as auth from '../actions/auth';
import LogoutView from '../components/LogoutView';
import { IUser } from '../types';

const createHandlers = ({
    history,
    dispatch,
}: {
    history: History;
    dispatch: Dispatch<AnyAction>;
}) => {
    const logout = (user: IUser) => {
        dispatch(auth.logout(user));
        history.push('/');
    };
    return {
        logout,
    };
};

export default withRouter<any>(
    connect()(
        (props: { history: History; dispatch: Dispatch<AnyAction> }) => (
            <LogoutView handlers={createHandlers(props)} />
        ),
    ),
);
