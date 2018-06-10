import { IUser } from '../types';

export const LOGIN_USER = 'LOGIN_USER';
export type LOGIN_USER = typeof LOGIN_USER;
export const LOGOUT_USER = 'LOGOUT_USER';
export type LOGOUT_USER = typeof LOGOUT_USER;

export function login(
    user: IUser,
): {
    type: LOGIN_USER;
    user: IUser;
} {
    return {
        type: LOGIN_USER,
        user,
    };
}

export function logout(
    user: IUser,
): {
    type: LOGOUT_USER;
    user: IUser;
} {
    return {
        type: LOGOUT_USER,
        user,
    };
}
