import { combineReducers } from 'redux';
import auth from './auth';
import status from './status';
import todos from './todos';
const rootReducer = combineReducers({
    auth,
    status,
    todos,
});

export default rootReducer;
