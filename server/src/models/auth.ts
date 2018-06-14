import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database';

export const createTable = async () => {
    const client = await pool.connect();
    await client.query('DROP TABLE IF EXISTS users');
    const result = await client.query(
        'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(40) UNIQUE NOT NULL, password CHAR(60) NOT NULL)',
    );
    client.release();
    return result.rows;
};

export const seedTable = async (
    newUsers: {
        username: string;
        password: string;
    }[],
) => {
    await createTable();
    const client = await pool.connect();
    for (let user of newUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await client.query(
            'INSERT INTO users(username, password) values($1, $2)',
            [user.username, hashedPassword],
        );
    }
    const result = await client.query('SELECT * FROM users');
    client.release();
    return result.rows;
};

export const dropTable = async () => {
    const client = await pool.connect();
    const result = await client.query('DROP TABLE IF EXISTS users');
    client.release();
    return result.rows;
};

export const authenticateUser = async (
    username: string,
    candidatePassword: string,
) => {
    const client = await pool.connect();
    const users = await client.query(
        'SELECT * FROM users WHERE username=($1)',
        [username],
    );
    const { id, password } = users.rows[0];
    const validPassword = await bcrypt.compare(candidatePassword, password);
    if (!validPassword) {
        const error = new Error('Invalid username or password');
        throw error;
    }
    const token = jwt.sign(
        {
            id,
            username,
        },
        String(process.env.SECRET_KEY),
    );
    client.release();
    return { id, username, token };
};

export const createUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    await client.query('INSERT INTO users(username, password) values($1, $2)', [
        username,
        hashedPassword,
    ]);
    const users = await client.query(
        'SELECT * FROM users WHERE username=($1)',
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
    client.release();
    return { id, username, token };
};

export const removeUser = async (username: string) => {
    const client = await pool.connect();
    await client.query(`DELETE FROM users WHERE username=($1);`, [username]);
    client.release();
};
