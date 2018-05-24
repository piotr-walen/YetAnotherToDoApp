import { LOGIN_USER, LOGOUT_USER } from '../actions';

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { authenticated: true, user: action.user };
        case LOGOUT_USER:
            return { authenticated: false, user: {} };
        default:
            return state;
    }
};
