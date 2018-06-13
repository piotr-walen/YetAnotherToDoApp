import express, { NextFunction, Request, Response } from 'express';
import * as auth from '../models/auth';

export const login = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { username } = request.body;
        const candidatePassword = request.body.password;
        const data = await auth.authenticateUser(username, candidatePassword);
        response.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const register = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { username, password } = request.body;
        const data = await auth.createUser(username, password);
        response.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};
