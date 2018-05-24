import React, { Component } from 'react';

export default class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handlers.login({
            ...this.state
        });

        this.setState({
            username: '',
            password: ''
        });
    };

    handleChange = field => event => {
        const value = event.target.value;
        this.setState(previousState => {
            const newState = { ...previousState };
            newState[field] = value;
            return newState;
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Login </label>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    placeholder="username"
                />
                <input
                    value={this.state.password}
                    type="password"
                    onChange={this.handleChange('password')}
                    placeholder="password"
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}