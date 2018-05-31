import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = function(
    request: Request,
    response: Response,
    next: NextFunction
) {
    let error = new Error('Not Found');
    next(error);
};

export const errorHandler = function(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    console.log(error);
    response.status(500).send({ error: error.message });
};
