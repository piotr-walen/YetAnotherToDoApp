import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AnyAction, DispatchProp } from 'redux';
import * as auth from '../actions/auth';
import LoginForm from '../components/LoginForm';
import { IUser } from '../types';

const createHandlers = ({
    history,
    dispatch,
}: {
    history: History;
    dispatch: DispatchProp<AnyAction>;
}) => {
    const login = async (user: IUser) => {
        const request = {
            body: JSON.stringify({
                ...user,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            type: 'cors',
        };
        try {
            const response = await fetch('/api/auth/login/', request);
            const parsed = await response.json();
            if (parsed.error) {
                throw new Error(parsed.error);
            }
            if (parsed.data) {
                dispatch(auth.login(parsed.data));
                history.push('/');
            }
        } catch (error) {
            // console.log(error.message);
        }
    };

    return {
        login,
    };
};

export default withRouter<any>(
    connect()(
        (props: { history: History; dispatch: DispatchProp<AnyAction> }) => (
            <LoginForm handlers={createHandlers(props)} />
        ),
    ),
);
