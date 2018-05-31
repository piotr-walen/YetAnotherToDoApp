import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginRequired = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        if (!request.headers.authorization) {
            const error = new Error("Missing authorization header");
            throw error;
        }
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(
            token,
            String(process.env.SECRET_KEY),
            (error: Error, decoded) => {
                if (decoded) {
                    next();
                } else {
                    throw new Error("Incorrect authorization token");
                }
            },
        );
    } catch (error) {
        next(error);
    }
};

export const ensureCorrectUser = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        if (!request.headers.authorization) {
            const error = new Error("Missing authorization header");
            throw error;
        }
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token, String(process.env.SECRET_KEY), function(
            error: Error,
            decoded,
        ) {
            if (
                decoded &&
                Object(decoded).id === Number(request.params.userId)
            ) {
                next();
            } else {
                throw new Error("Unauthorized");
            }
        });
    } catch (error) {
        next(error);
    }
};
