const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../database');

router.post('/api/auth/login', async function(request, response, next) {
    try {
        const { username } = request.body;
        const candidatePassword = request.body.password;
        client = await pool.connect();
        users = await client.query('SELECT * FROM users WHERE username=($1)', [
            username
        ]);
        const { id, password } = users.rows[0];
        const validPassword = await bcrypt.compare(candidatePassword, password);
        if (!validPassword) {
            const error = new Error('Invalid username or password');
            error.status = 400;
            throw error;
        }
        const token = jwt.sign(
            {
                id,
                username
            },
            process.env.SECRET_KEY
        );
        response.status(200).json({ data: { id, username, token } });
    } catch (error) {
        next(error);
    }
});

router.post('/api/auth/register', async function(request, response, next) {
    try {
        const { username, password } = request.body;
        let hashedPassword = await bcrypt.hash(password, 10);

        client = await pool.connect();
        await client.query(
            'INSERT INTO users(username, password) values($1, $2)',
            [username, hashedPassword]
        );

        users = await client.query('SELECT * FROM users WHERE username=($1)', [
            username
        ]);
        const { id } = users.rows[0];
        const token = jwt.sign(
            {
                id,
                username
            },
            process.env.SECRET_KEY
        );
        response.status(200).json({ data: { id, username, token } });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
