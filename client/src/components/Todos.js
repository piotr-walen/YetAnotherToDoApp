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

    handleDelete = todo => event => {
        this.props.deleteTodo(this.props.user, todo);
    };

    render() {
        return (
            <MainWrapper>
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        type="text"
                        value={this.state.todo.text}
                        onChange={this.handleChange}
                        placeholder="Add ToDo"
                    />
                    <Button type="submit">Submit</Button>
                </Form>
                <List>
                    {this.props.todos.map(todo => (
                        <TodoGroup key={todo.id}>
                            <DeleteIcon onClick={this.handleDelete(todo)}>
                                {'X '}
                            </DeleteIcon>
                            {todo.complete ? (
                                <CheckedTodo onClick={this.handleClick(todo)}>
                                    {todo.text}
                                </CheckedTodo>
                            ) : (
                                <Todo onClick={this.handleClick(todo)}>
                                    {todo.text}
                                </Todo>
                            )}
                        </TodoGroup>
                    ))}
                </List>
            </MainWrapper>
        );
    }
}

export default Todos;

const MainWrapper = styled.div`
    margin: 50px auto;
    width: 500px;
    font-size: 24px;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Input = styled.input`
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    width: 100%;
    border-radius: 4px;
    margin-right: 4px;
    text-indent: 10px;
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
    font-size: 18px;
    height: 40px;
    border-radius: 4px;
    background-color: rgba(10, 50, 200, 1);
    color: white;
`;

const List = styled.div`
    width: 100%;
    list-style-type: none;
`;

const Todo = styled.span`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const TodoGroup = styled.li``;

const CheckedTodo = styled(Todo)`
    text-decoration: line-through;
`;

const DeleteIcon = styled.label``;
