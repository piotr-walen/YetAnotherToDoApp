const express = require('express');
const router = express.Router();
const pool = require('../database');

const { loginRequired, ensureCorrectUser } = require('../middleware/auth');

router.post(
    '/api/user/:userId/todos',
    ensureCorrectUser,
    async (request, response, next) => {
        const { userId } = request.params;
        const { text } = request.body;
        const complete = false;
        try {
            client = await pool.connect();
            await client.query(
                'INSERT INTO items(userId, text, complete) values($1, $2, $3)',
                [userId, text, complete]
            );
            const items = await client.query(
                'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
                [userId]
            );
            client.release();
            response.status(201).json({ data: items.rows });
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/api/user/:userId/todos/',
    ensureCorrectUser,
    async (request, response, next) => {
        try {
            const { userId } = request.params;
            client = await pool.connect();
            const items = await client.query(
                'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
                [userId]
            );
            response.status(200).json({ data: items.rows });
            client.release();
        } catch (error) {
            next(error);
        }
    }
);

router.put(
    '/api/user/:userId/todos/:id',
    ensureCorrectUser,
    async (request, response, next) => {
        try {
            const { text, complete } = request.body;
            const { userId, id } = request.params;
            client = await pool.connect();
            const result = await client.query(
                'UPDATE items SET text=($1), complete=($2) WHERE id=($3) AND userID=($4)',
                [text, complete, id, userId]
            );
            if (result.rowCount === 0) {
                let error = new Error(`Todo with id $(id) not found`);
                error.status = 404;
                throw error;
            }
            const items = await client.query(
                'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
                [userId]
            );
            response.status(200).json({ data: items.rows });
            client.release();
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    '/api/user/:userId/todos/:id',
    ensureCorrectUser,
    async (request, response, next) => {
        try {
            const { id, userId } = request.params;
            client = await pool.connect();
            const result = await client.query(
                'DELETE FROM items WHERE id=($1) AND userID=($2)',
                [id, userId]
            );
            if (result.rowCount === 0) {
                let error = new Error(`Todo with id ${id} not found`);
                error.status = 404;
                throw error;
            }
            const items = await client.query(
                'SELECT * FROM items WHERE userId=($1) ORDER BY id ASC',
                [userId]
            );
            response.status(200).json({ data: items.rows });
            client.release();
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
