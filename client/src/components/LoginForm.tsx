import * as React from 'react';
import styled from 'styled-components';

export interface ILoginFormProps {
    handlers: {
        login: (
            user: {
                password: string;
                username: string;
            },
        ) => void;
    };
}

export interface ILoginFormState {
    password: string;
    username: string;
}

export default class LoginForm extends React.Component<
    ILoginFormProps,
    ILoginFormState
> {
    public state = {
        password: '',
        username: '',
    };

    public render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Label> Login </Label>
                <Input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    placeholder="username"
                />
                <Input
                    value={this.state.password}
                    type="password"
                    onChange={this.handleChange('password')}
                    placeholder="password"
                />
                <Button type="submit">Submit</Button>
            </Form>
        );
    }

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        this.props.handlers.login({
            ...this.state,
        });

        this.setState({
            password: '',
            username: '',
        });
    };

    private handleChange = (field: string) => (
        event: React.ChangeEvent<HTMLElement>,
    ) => {
        const { value } = event.target as HTMLInputElement;
        this.setState(previousState => {
            const newState = { ...previousState };
            newState[field] = value;
            return newState;
        });
    };
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
    font-family: 'Titillium Web', sans-serif;
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
    font-size: 18px;
    border: 1px solid grey;
`;

const Button = styled.button`
    font-family: 'Titillium Web', sans-serif;
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-size: 18px;
    height: 40px;
    margin: 10px 10px 10px;
    border-radius: 4px;
    background-color: rgba(10, 50, 200, 1);
    color: white;
`;
