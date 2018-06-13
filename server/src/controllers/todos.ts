import { NextFunction, Request, Response } from 'express';
import pool from '../database';

export const createTodo = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const { userId } = request.params;
    const { text } = request.body;
    const complete = false;
    try {
        const client = await pool.connect();
        await client.query(
            'INSERT INTO items(userId, text, complete) values($1, $2, $3)',
            [userId, text, complete],
        );
        const items = await client.query(
            'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
            [userId],
        );
        client.release();
        response.status(201).json({ data: items.rows });
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
        const client = await pool.connect();
        const items = await client.query(
            'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
            [userId],
        );
        response.status(200).json({ data: items.rows });
        client.release();
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
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE items SET text=($1), complete=($2) WHERE id=($3) AND userID=($4)',
            [text, complete, id, userId],
        );
        if (result.rowCount === 0) {
            const error = new Error(`Todo with id $(id) not found`);
            throw error;
        }
        const items = await client.query(
            'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
            [userId],
        );
        response.status(200).json({ data: items.rows });
        client.release();
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
        const client = await pool.connect();
        const result = await client.query(
            'DELETE FROM items WHERE id=($1) AND userID=($2)',
            [id, userId],
        );
        if (result.rowCount === 0) {
            let error = new Error(`Todo with id ${id} not found`);
            throw error;
        }
        const items = await client.query(
            'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
            [userId],
        );
        response.status(200).json({ data: items.rows });
        client.release();
    } catch (error) {
        next(error);
    }
};
