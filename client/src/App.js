import React, { Component } from 'react';
import Routes from './routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Navbar from './containers/Navbar';
class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Routes />
            </div>
        );
    }
}

export default withRouter(App);
