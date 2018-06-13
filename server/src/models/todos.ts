import dotenv from 'dotenv';
import pg from 'pg';
import pool from '../database';

const createTodosTable = async () => {
    const client = await pool.connect();
    const result = await client.query(
        'CREATE TABLE items(id SERIAL PRIMARY KEY, userId SERIAL, text VARCHAR(40) not null, complete BOOLEAN)',
    );
    console.log(result.rows);
    client.release();
};
export const createTodo = async (
    userId: number,
    text: string,
    complete: boolean,
) => {
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
    return items.rows;
};

export const getTodos = async (userId: number) => {
    const client = await pool.connect();
    const items = await client.query(
        'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
        [userId],
    );
    client.release();
    return items.rows;
};

export const updateTodo = async (
    userId: number,
    id: number,
    text: string,
    complete: boolean,
) => {
    const client = await pool.connect();
    const result = await client.query(
        'UPDATE items SET text=($1), complete=($2) WHERE id=($3) AND userID=($4)',
        [text, complete, id, userId],
    );
    if (result.rowCount === 0) {
        const error = new Error(`Todo with id $(id) not found`);
        throw error;
    }
    client.release();
    return result.rows;
};

export const deleteTodo = async (userId: number, id: number) => {
    const client = await pool.connect();
    const result = await client.query(
        'DELETE FROM items WHERE id=($1) AND userID=($2)',
        [id, userId],
    );
    if (result.rowCount === 0) {
        let error = new Error(`Todo with id ${id} not found`);
        throw error;
    }
    client.release();
};
