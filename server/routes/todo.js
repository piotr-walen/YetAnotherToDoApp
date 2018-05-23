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
        const items = await client.query('SELECT * FROM items ORDER BY id ASC');
        response.status(201).json({ data: items.rows });
        client.release();
    } catch (error) {
        next(error);
    }
});

router.get('/api/v1/todos', async (request, response, next) => {
    try {
        client = await pool.connect();
        const items = await client.query('SELECT * FROM items ORDER BY id ASC');
        response.status(200).json({ data: items.rows });
        client.release();
    } catch (error) {
        next(error);
    }
});

router.put('/api/v1/todos/:id', async (request, response, next) => {
    const { text, complete } = request.body;
    const { id } = request.params;
    try {
        client = await pool.connect();
        const result = await client.query(
            'UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
            [text, complete, id]
        );
        if (result.rowCount === 0) {
            let error = new Error(`Todo with id ${id} not found`);
            error.status = 404;
            throw error;
        }
        const items = await client.query('SELECT * FROM items ORDER BY id ASC');
        response.status(200).json({ data: items.rows });
    } catch (error) {
        next(error);
    }
});

router.delete('/api/v1/todos/:id', async (request, response, next) => {
    const { id } = request.params;
    try {
        client = await pool.connect();
        const result = await client.query('DELETE FROM items WHERE id=($1)', [
            id
        ]);
        if (result.rowCount === 0) {
            let error = new Error(`Todo with id ${id} not found`);
            error.status = 404;
            throw error;
        }
        const items = await client.query('SELECT * FROM items ORDER BY id ASC');
        response.status(200).json({ data: items.rows });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
