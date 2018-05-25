import React from 'react';
import * as todos from '../actions/todos';
import { connect } from 'react-redux';
import Todos from '../components/Todos';

const mapDispatchToProps = dispatch => ({
    loadTodos: async user => {
        const request = {
            type: 'cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer: ${user.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`api/user/${user.id}/todos`, request);
            const parsed = await response.json();
            if (parsed.error) {
                throw new Error(parsed.error);
            }
            if (parsed.data) {
                dispatch(todos.loadTodos(parsed.data));
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    createTodo: async (user, todo) => {
        console.log(todo);
        const request = {
            body: JSON.stringify(todo),
            type: 'cors',
            method: 'POST',
            headers: {
                Authorization: `Bearer: ${user.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`api/user/${user.id}/todos`, request);
            const parsed = await response.json();
            if (parsed.error) {
                throw new Error(parsed.error);
            }
            if (parsed.data) {
                dispatch(todos.loadTodos(parsed.data));
            }
        } catch (error) {
            console.log(error.message);
        }
    }
});

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    todos: state.todos.todos
});

export default connect(mapStateToProps, mapDispatchToProps)(props => (
    <Todos {...props} />
));
