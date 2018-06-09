import React from 'react';
import * as todos from '../actions/todos';
import { connect } from 'react-redux';
import Todos from '../components/Todos';

const mapDispatchToProps = dispatch => ({
    createTodo: async (user, todo) => {
        const request = {
            body: JSON.stringify(todo),
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            type: 'cors',
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
            // console.log(error.message);
        }
    },

    deleteTodo: async (user, todo) => {
        const request = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            type: 'cors',
        };
        try {
            const response = await fetch(
                `api/user/${user.id}/todos/${todo.id}`,
                request
            );
            const parsed = await response.json();
            if (parsed.error) {
                throw new Error(parsed.error);
            }
            if (parsed.data) {
                dispatch(todos.loadTodos(parsed.data));
            }
        } catch (error) {
            // console.log(error.message);
        }
    },

    loadTodos: async user => {
        const request = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            type: 'cors',

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
            // console.log(error.message);
        }
    },

    toggleTodo: async (user, todo) => {
        const request = {
            body: JSON.stringify({ ...todo, complete: !todo.complete }),
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            type: 'cors',
        };
        try {
            const response = await fetch(
                `api/user/${user.id}/todos/${todo.id}`,
                request
            );
            const parsed = await response.json();
            if (parsed.error) {
                throw new Error(parsed.error);
            }
            if (parsed.data) {
                dispatch(todos.loadTodos(parsed.data));
            }
        } catch (error) {
            // console.log(error.message);
        }
    },

});

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    todos: state.todos.todos,
    user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(props => (
    <Todos {...props} />
));
