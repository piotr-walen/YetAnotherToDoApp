import React from 'react';
import styled from 'styled-components';

class Todos extends React.Component {
    componentDidMount() {
        this.props.loadTodos(this.props.user);
    }

    state = {
        todo: { text: '', complete: false }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.createTodo(this.props.user, {
            ...this.state.todo
        });

        this.setState({
            todo: { text: '', complete: false }
        });
    };

    handleChange = event => {
        const value = event.target.value;
        this.setState(previousState => ({
            ...previousState,
            todo: { ...previousState.todo, text: value }
        }));
    };

    handleClick = todo => event => {
        this.props.toggleTodo(this.props.user, todo);
    };

    render() {
        return (
            <div>
                <label> Add todo: </label>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.todo.text}
                        onChange={this.handleChange}
                        placeholder="todo"
                    />
                    <button type="submit">Submit</button>
                </form>
                <List>
                    {this.props.todos.map(
                        todo =>
                            todo.complete ? (
                                <CheckedTodo
                                    key={todo.id}
                                    onClick={this.handleClick(todo)}
                                >
                                    {todo.text}
                                </CheckedTodo>
                            ) : (
                                <Todo
                                    key={todo.id}
                                    onClick={this.handleClick(todo)}
                                >
                                    {todo.text}
                                </Todo>
                            )
                    )}
                </List>
            </div>
        );
    }
}

export default Todos;

const List = styled.div`
    margin: 50px auto;
    width: 500px;
`;

const Todo = styled.li`
    font-size: 24px;
`;

const CheckedTodo = styled(Todo)`
    text-decoration: line-through;
`;
