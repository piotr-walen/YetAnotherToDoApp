import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database';

async function createUsersTable() {
    const client = await pool.connect();
    const result = await client.query(
        'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(40) UNIQUE NOT NULL, password CHAR(60) NOT NULL)',
    );
    console.log(result.rows);
    client.release();
}

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
