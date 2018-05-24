import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
}

export default connect(mapStateToProps)(
    ({ authenticated, user }) => (
        <Navbar authenticated={authenticated} user={user} />
    )
);
