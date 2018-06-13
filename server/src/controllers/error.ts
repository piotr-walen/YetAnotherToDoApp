import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const error = new Error('Not Found');
    response.status(404).send({ error: error.message });
};

export const errorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    console.log(error);
    response.status(500).send({ error: error.message });
};
