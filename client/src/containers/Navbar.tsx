import * as React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { IState } from '../types';

function mapStateToProps(state: IState) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
}

export default connect(mapStateToProps)(({ authenticated, user }) => (
    <Navbar authenticated={authenticated} user={user} />
));
