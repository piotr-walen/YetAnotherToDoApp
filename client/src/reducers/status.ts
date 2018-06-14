import { AnyAction } from 'redux';
import { ADD_STATUS, CLEAR_STATUS } from '../actions/status';
import { IStatus } from '../types';

const initialState: IStatus = {};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ADD_STATUS:
            return action.status;
        case CLEAR_STATUS:
            return {};
        default:
            return state;
    }
};
