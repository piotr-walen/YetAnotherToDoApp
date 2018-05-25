import React from 'react';
import styled from 'styled-components';

class Todos extends React.Component {
    componentDidMount() {
        this.props.loadTodos(this.props.user);
    }
    render() {
        return (
            <List>
                {this.props.todos.map(
                    todo =>
                        todo.complete ? (
                            <CheckedTodo key={todo.id}>{todo.text}</CheckedTodo>
                        ) : (
                            <Todo key={todo.id}>{todo.text}</Todo>
                        )
                )}
            </List>
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
