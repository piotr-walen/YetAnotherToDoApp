const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/api/v1/todos', async (request, response, next) => {
    const { text } = request.body;
    const complete = false;
    try {
        client = await pool.connect();
        await client.query('INSERT INTO items(text, complete) values($1, $2)', [
            text,
            complete
        ]);
        const dbData = await client.query(
            'SELECT * FROM items ORDER BY id ASC'
        );
        response.status(200).json({ data: dbData.rows });
        client.release();
    } catch (error) {
        next(error);
    }
});

router.get('/api/v1/todos', async (request, response, next) => {
    try {
        client = await pool.connect();
        const dbData = await client.query(
            'SELECT * FROM items ORDER BY id ASC'
        );
        response.status(200).json({ data: dbData.rows });
        client.release();
    } catch (error) {
        next(error);
    }
});

router.put('/api/v1/todos/:todo_id', async (request, response, next) => {
    const { text, complete } = request.body;
    const { todo_id } = request.params;
    try {
        client = await pool.connect();
        await client.query(
            'UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
            [text, complete, todo_id]
        );
        const dbData = await client.query(
            'SELECT * FROM items ORDER BY id ASC'
        );
        response.status(200).json({ data: dbData.rows });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
