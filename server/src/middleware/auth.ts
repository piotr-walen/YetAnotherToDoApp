import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const loginRequired = function(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        if (!request.headers.authorization) {
            const error = new Error('Missing authorization header');
            throw error;
        }
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, String(process.env.SECRET_KEY), function(
            error: Error,
            decoded
        ) {
            if (decoded) {
                next();
            } else {
                const error = new Error('Incorrect authorization token');
                throw error;
            }
        });
    } catch (error) {
        next(error);
    }
};

const ensureCorrectUser = function(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        if (!request.headers.authorization) {
            const error = new Error('Missing authorization header');
            throw error;
        }
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, String(process.env.SECRET_KEY), function(
            error: Error,
            decoded
        ) {
            if (
                decoded &&
                Object(decoded).id === Number(request.params.userId)
            ) {
                next();
            } else {
                const error = new Error('Unauthorized');
                throw error;
            }
        });
    } catch (error) {
        next(error);
    }
};

export { loginRequired, ensureCorrectUser };
