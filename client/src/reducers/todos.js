import { LOAD_TODOS, ADD_TODO } from '../actions/todos';

const initialState = { todos: [] };

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TODOS:
            return { todos: [...action.todos] };
        case ADD_TODO:
            return { todos: [...state.todos, action.todo] };
        default:
            return state;
    }
};
