import React, { Component } from 'react';

class LogoutView extends Component {
    componentDidMount() {
        this.props.handlers.logout();
    }
    render() {
        return <div>Logging out...</div>;
    }
}

export default LogoutView;
