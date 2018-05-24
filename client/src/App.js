import React, { Component } from 'react';
import Routes from './routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div>
                <div>Yet Another ToDo List</div>
                
                <div>
                    <Link to="/">link to /</Link>
                </div>
                <div>
                    <Link to="/login">link to /login/</Link>
                </div>
                <div>
                    <Link to="/register">link to /register/</Link>
                </div>
                <div>
                    <Link to="/logout">link to /logout/</Link>
                </div>

                <Routes />
            </div>
        );
    }
}

export default withRouter(App);
