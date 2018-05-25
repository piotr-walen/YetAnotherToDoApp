import React from 'react';
import * as todos from '../actions/todos';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    loadTodos: userId => {
        dispatch(todos.loadTodos(todos));
    }
});

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    todos: state.todos.todos
});

export default connect(mapStateToProps, mapDispatchToProps)(({ todos }) => (
    <div>{todos.map(todo => <li>{todo.text}</li>)}</div>
));
