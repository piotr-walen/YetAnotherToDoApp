import { NextFunction, Request, Response } from 'express';
import * as todos from '../models/todos';

export const createTodo = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const { userId } = request.params;
    const { text } = request.body;
    const complete = false;
    try {
        const data = await todos.createTodo(userId, text, complete);
        response.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const getTodos = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = request.params;
        const data = todos.getTodos(userId);
        response.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const updateTodo = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { text, complete } = request.body;
        const { userId, id } = request.params;
        const result = await todos.updateTodo(userId, id, text, complete);
        const data = await todos.getTodos(userId);
        response.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const deleteTodo = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { id, userId } = request.params;
        const result = await todos.deleteTodo(userId, id);
        const data = await todos.getTodos(userId);
        response.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};
