export interface IUser {
    username: string;
    password: string;
    token: string;
    id: number;
}

export interface ITodo {
    id: number;
    text: string;
    complete: boolean;
}
export interface IStatus {
    severity?: string;
    message?: string;
}

export interface IState {
    auth: {
        authenticated: boolean;
        user: IUser;
    };
    todos: ITodo[];
    status: IStatus;
}
