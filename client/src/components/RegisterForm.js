import React, { Component } from 'react';

export default class Register extends Component {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handlers.register({
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
                <label> Register </label>
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

const Label = styled.label`
    font-size: 24px;
    margin-top: 10px;
    margin: 10px auto 0px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    border: 1px solid grey;
    border-radius: 4px;
    margin: 15px auto 0px;
`;

const Input = styled.input`
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    height: 40px;
    margin: 10px 10px 0px;
    border-radius: 4px;
    text-indent: 8px;
    font-size: 20px;
    border: 1px solid grey;
`;

const Button = styled.button`
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-size: 20px;
    height: 40px;
    margin: 10px 10px 10px;
    border-radius: 4px;
    background-color: rgba(10, 50, 200, 1);
    color: white;
`;
