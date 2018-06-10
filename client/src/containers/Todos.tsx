import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import * as todos from '../actions/todos';
import Todos from '../components/Todos';
import { IState, ITodo, IUser } from '../types';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    createTodo: async (user: IUser, todo: ITodo) => {
        const request = {
            body: JSON.stringify(todo),
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json',
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

    deleteTodo: async (user: IUser, todo: ITodo) => {
        const request = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            type: 'cors',
        };
        try {
            const response = await fetch(
                `api/user/${user.id}/todos/${todo.id}`,
                request,
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

    loadTodos: async (user: IUser) => {
        const request = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json',
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

    toggleTodo: async (user: IUser, todo: ITodo) => {
        const request = {
            body: JSON.stringify({ ...todo, complete: !todo.complete }),
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer: ${user.token}`,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            type: 'cors',
        };
        try {
            const response = await fetch(
                `api/user/${user.id}/todos/${todo.id}`,
                request,
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

const mapStateToProps = (state: IState) => ({
    authenticated: state.auth.authenticated,
    todos: state.todos,
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(props => <Todos {...props} />);
