export const LOAD_TODOS = 'LOAD_TODOS';
export const ADD_TODO = 'ADD_TODO';

export function loadTodos(todos) {
    return {
        type: LOAD_TODOS,
        todos
    };
}

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo
    };
}
