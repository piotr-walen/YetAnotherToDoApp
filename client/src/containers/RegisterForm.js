import RegisterForm from '../components/RegisterForm';
import * as auth from '../actions/auth';
import { connect } from 'react-redux';
import React from 'react';

let createHandlers = ({ history, dispatch }) => {
    let register = async function(data) {
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
            const response = await fetch('/api/auth/register/', request);
            const parsed = await response.json();
            console.log(parsed);
            if (parsed.error) {
                throw new Error(parsed.error);
            }
            if (parsed.data) {
                dispatch(auth.login(parsed.data));
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        register
    };
};

export default connect()(props => (
    <RegisterForm handlers={createHandlers(props)} />
));
