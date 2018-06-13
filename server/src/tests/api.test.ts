import request from 'supertest';
import app from '../index';
import { describe, it } from 'mocha';
import bcrypt from 'bcrypt';
import pool from '../database';
import jwt from 'jsonwebtoken';
import { createUser, removeUser } from '../controllers/auth';

describe('GET /', () => {
    it('should return 200 OK', () => {
        request(app)
            .get('/')
            .expect(200);
    });
});

describe('GET /random-url', () => {
    it('should return 404', done => {
        request(app)
            .get('/reset')
            .expect(404, done);
    });
});

describe('POST /api/auth/login', async () => {
    let username: string;
    let password: string;
    let data: { username: string; id: number; token: string };

    before(async () => {
        username = 'test_username';
        password = 'test_password';
        data = await createUser({
            username: 'test_username',
            password: 'test_password',
        });
    });
    it('it should return user data', done => {
        request(app)
            .post('/api/auth/login')
            .send({ username, password })
            .expect(200, { data }, done);
    });
    after(async () => {
        await removeUser(username);
    });
});
