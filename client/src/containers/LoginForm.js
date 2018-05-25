import LoginForm from '../components/LoginForm';
import * as auth from '../actions/auth';
import { connect } from 'react-redux';
import React from 'react';

let createHandlers = ({ history, dispatch }) => {
    let login = async function(data) {
        const request = {
            type: 'cors',
            body: JSON.stringify({
                ...data
            }),
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
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
            console.log(error.message);
        }
    };

    return {
        login
    };
};

export default connect()(props => (
    <LoginForm handlers={createHandlers(props)} />
));
