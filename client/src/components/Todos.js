import React from 'react';

class Todos extends React.Component {
    componentDidMount() {
        this.props.loadTodos(this.props.user);
    }
    render() {
        return (
            <div>
                {this.props.todos.map(todo => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </div>
        );
    }
}
