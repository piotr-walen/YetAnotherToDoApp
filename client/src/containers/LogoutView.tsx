import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AnyAction, DispatchProp } from 'redux';
import * as auth from '../actions/auth';
import LogoutView from '../components/LogoutView';
import { IUser } from '../types';

const createHandlers = ({
    history,
    dispatch,
}: {
    history: History;
    dispatch: DispatchProp<AnyAction>;
}) => {
    const logout = (data: IUser) => {
        dispatch(auth.logout());
        history.push('/');
    };
    return {
        logout,
    };
};

export default withRouter<any>(
    connect()(
        (props: { history: History; dispatch: DispatchProp<AnyAction> }) => (
            <LogoutView handlers={createHandlers(props)} />
        ),
    ),
);
