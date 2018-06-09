export const LOAD_TODOS = 'LOAD_TODOS';
export const ADD_TODO = 'ADD_TODO';

export function loadTodos(todos) {
    return {
        todos,
        type: LOAD_TODOS,
    };
}

export function addTodo(todo) {
    return {
        todo,
        type: ADD_TODO,
    };
}
