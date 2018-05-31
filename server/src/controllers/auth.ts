import bcrypt from "bcrypt";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../database";

export const login = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { username } = request.body;
        const candidatePassword = request.body.password;
        const client = await pool.connect();
        const users = await client.query(
            "SELECT * FROM users WHERE username=($1)",
            [username],
        );
        const { id, password } = users.rows[0];
        const validPassword = await bcrypt.compare(candidatePassword, password);
        if (!validPassword) {
            const error = new Error("Invalid username or password");
            throw error;
        }
        const token = jwt.sign(
            {
                id,
                username,
            },
            String(process.env.SECRET_KEY),
        );
        response.status(200).json({ data: { id, username, token } });
        client.release();
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
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = await pool.connect();
        await client.query(
            "INSERT INTO users(username, password) values($1, $2)",
            [username, hashedPassword],
        );

        const users = await client.query(
            "SELECT * FROM users WHERE username=($1)",
            [username],
        );
        const { id } = users.rows[0];
        const token = jwt.sign(
            {
                id,
                username,
            },
            String(process.env.SECRET_KEY),
        );
        response.status(200).json({ data: { id, username, token } });
        client.release();
    } catch (error) {
        next(error);
    }
};
