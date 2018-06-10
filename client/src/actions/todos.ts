import {ITodo} from '../types';

export const LOAD_TODOS = 'LOAD_TODOS';
export type LOAD_TODOS = typeof LOAD_TODOS;
export const ADD_TODO = 'ADD_TODO';
export type ADD_TODO = typeof ADD_TODO;

export function loadTodos(todos: ITodo[]) : {
    todos: ITodo[];
    type: LOAD_TODOS;
} {
    return {
        todos,
        type: LOAD_TODOS,
    };
}

export function addTodo(todo: ITodo) : {
    todo: ITodo;
    type: ADD_TODO;
} {
    return {
        todo,
        type: ADD_TODO,
    };
}
