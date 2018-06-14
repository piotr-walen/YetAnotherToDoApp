import { IStatus } from '../types';

export const ADD_STATUS = 'ADD_STATUS ';
export type ADD_STATUS = typeof ADD_STATUS;
export const CLEAR_STATUS = 'CLEAR_STATUS';
export type CLEAR_STATUS = typeof CLEAR_STATUS;

export function add(
    status: IStatus,
): {
    status: IStatus;
    type: ADD_STATUS;
} {
    console.log(status);
    return {
        status,
        type: ADD_STATUS,
    };
}

export function clear(): {
    type: CLEAR_STATUS;
} {
    return {
        type: CLEAR_STATUS,
    };
}
