const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/api/v1/todos', async (request, response, next) => {
    const results = [];
    // Grab data from http request
    const data = { text: request.body.text, complete: false };
    try {
        // Get a Postgres client from the connection pool
        client = await pool.connect();
        // SQL Query > Insert Data
        await client.query('INSERT INTO items(text, complete) values($1, $2)', [
            data.text,
            data.complete
        ]);
        // SQL Query > Select Data
        const databaseResponse = await client.query(
            'SELECT * FROM items ORDER BY id ASC'
        );
        // Stream results back one row at a time
        databaseResponse.rows.forEach(row => {
            console.log(row);
            results.push(row);
        });
        // After all data is returned, close connection and return results
        client.release();
        response.status(200).json({ data: results });
    } catch (error) {
        next(error);
    }
});

router.get('/api/v1/todos', async (request, response, next) => {
    const results = [];
    try {
        // Get a Postgres client from the connection pool
        client = await pool.connect();
        // SQL Query > Select Data
        const databaseResponse = await client.query(
            'SELECT * FROM items ORDER BY id ASC'
        );
        // Stream results back one row at a time
        databaseResponse.rows.forEach(row => {
            console.log(row);
            results.push(row);
        });
        // After all data is returned, close connection and return results
        client.release();
        response.status(200).json({ data: results });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
