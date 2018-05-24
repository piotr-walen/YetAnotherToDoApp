import React from 'react';
import LogoutView from '../components/LogoutView';
import * as auth from '../actions/auth';
import { connect } from 'react-redux';

let createHandlers = ({ history, dispatch }) => {
    let logout = function(data) {
        dispatch(auth.logout());
        history.push('/');
    };

    return {
        logout
    };
};

export default connect()(props => (
    <LogoutView handlers={createHandlers(props)} />
));
