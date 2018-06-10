import { AnyAction } from 'redux';
import { ADD_TODO, LOAD_TODOS } from '../actions/todos';
import { ITodo } from '../types';

const initialState: ITodo[] = [];

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case LOAD_TODOS:
            return [...action.todos];
        case ADD_TODO:
            return [...state, action.todo];
        default:
            return state;
    }
};
