import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
    auth,todos
});

export default rootReducer;
