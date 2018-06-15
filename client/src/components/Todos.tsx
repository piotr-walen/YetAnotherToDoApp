import * as React from 'react';
import styled from 'styled-components';
import { ITodo, IUser } from '../types';
interface ITodosProps {
    user: IUser;
    todos: ITodo[];
    loadTodos: (user: IUser) => void;
    createTodo: (user: IUser, todo: ITodo) => void;
    toggleTodo: (user: IUser, todo: ITodo) => void;
    deleteTodo: (user: IUser, todo: ITodo) => void;
}

interface ITodosState {
    todo: { text: string; complete: boolean };
}

class Todos extends React.Component<ITodosProps, ITodosState> {
    public state = {
        todo: { text: '', complete: false, id: -1 },
    };
    private input: any;

    constructor(props: ITodosProps) {
        super(props);
        this.input = React.createRef();
        this.onEnter = this.onEnter.bind(this);
        this.referenceInput = this.referenceInput.bind(this);
    }

    public render() {
        return (
            <MainWrapper>
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        type="text"
                        value={this.state.todo.text}
                        onChange={this.handleChange}
                        placeholder="Add ToDo"
                        innerRef={this.referenceInput}
                        onMouseEnter={this.onEnter}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
                <List>
                    {this.props.todos.map((todo: any) => (
                        <TodoGroup key={todo.id}>
                            <DeleteIcon onClick={this.handleDelete(todo)}>
                                <path d="M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z " />
                            </DeleteIcon>
                            <Todo
                                onClick={this.handleClick(todo)}
                                complete={todo.complete}
                            >
                                {todo.text}
                            </Todo>
                        </TodoGroup>
                    ))}
                </List>
            </MainWrapper>
        );
    }

    public componentDidMount() {
        this.props.loadTodos(this.props.user);
    }

    private referenceInput = (ref: any) => {
        this.input = ref;
    };
    private onEnter = () => this.input.focus();

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.createTodo(this.props.user, {
            ...this.state.todo,
        });

        this.setState({
            todo: { text: '', complete: false },
        });
    };

    private handleChange = (event: React.ChangeEvent<HTMLElement>) => {
        const { value } = event.target as HTMLInputElement;
        this.setState(previousState => ({
            ...previousState,
            todo: { ...previousState.todo, text: value },
        }));
    };

    private handleClick = (todo: ITodo) => (
        event: React.MouseEvent<HTMLSpanElement>,
    ) => {
        this.props.toggleTodo(this.props.user, todo);
    };

    private handleDelete = (todo: ITodo) => (
        event: React.MouseEvent<SVGSVGElement>,
    ) => {
        this.props.deleteTodo(this.props.user, todo);
    };
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
    margin-bottom: 8px;
`;

const Input = styled.input`
    font-family: 'Titillium Web', sans-serif;
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    width: 100%;
    margin-right: 8px;
    text-indent: 10px;
    font-size: 20px;
    border: 1px solid grey;
    border-radius: 4px;
    outline-width: 0;
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
    border-radius: 4px;
    background-color: rgba(10, 50, 200, 1);
    color: white;
`;

const List = styled.ul`
    width: 100%;
    list-style-type: none;
    list-style: none;
    margin: 0px;
    padding: 0px;
`;

const Todo = styled.span`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: 4px;
    text-decoration: ${({ complete }: { complete: boolean }) =>
        complete ? 'line-through' : 'none'};
`;

const TodoGroup = styled.li`
    display: flex;
    align-items: center;
    padding: 0;
    border-bottom: 1px solid grey;
    :first-child {
        border-top: 1px solid grey;
    }
`;

const DeleteIcon = styled.svg`
    width: 24px;
    height: 24px;
    margin-top: 8px;
    margin-bottom: 8px;
    opacity: 0;
    fill: rgba(250, 50, 50, 0.9);
    transition: opacity 0.3s ease-in-out;
    ${TodoGroup}:hover & {
        opacity: 1;
    }
`;
