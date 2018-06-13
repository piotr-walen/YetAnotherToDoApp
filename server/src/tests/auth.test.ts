import request from 'supertest';
import app from '../index';
import { describe, it } from 'mocha';
import bcrypt from 'bcrypt';
import pool from '../database';
import jwt from 'jsonwebtoken';
import { createUser, removeUser } from '../controllers/auth';
import { expect } from 'chai';

describe('POST /api/auth/login', async () => {
    let username: string;
    let password: string;
    let data: { username: string; id: number; token: string };

    before(async () => {
        username = 'test_username';
        password = 'test_password';
        data = await createUser('test_username', 'test_password');
    });
    it('it should return user data', done => {
        request(app)
            .post('/api/auth/login')
            .send({ username, password })
            .end((error, response: any) => {
                if (error) return done(error);
                expect(response.statusCode).to.equal(200);
                expect(response.body.data).to.deep.equal(data);
                done();
            });
    });
    after(async () => {
        await removeUser(username);
    });
});

describe('POST /api/auth/register', async () => {
    const username = 'test_username';
    const password = 'test_password';
    it('it should return user data', done => {
        request(app)
            .post('/api/auth/register')
            .send({ username, password })
            .end((error, response: any) => {
                if (error) return done(error);
                expect(response.statusCode).to.equal(200);
                expect(response.body.data).to.have.keys(
                    'id',
                    'username',
                    'token',
                );
                expect(response.body.data.username).to.equal(username);
                done();
            });
    });
    after(async () => {
        await removeUser(username);
    });
});
