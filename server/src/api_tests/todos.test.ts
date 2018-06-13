import request from 'supertest';
import app from '../index';
import { describe, it } from 'mocha';
import bcrypt from 'bcrypt';
import pool from '../database';
import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import * as auth from '../models/auth';
import * as todos from '../models/todos';

describe('POST /api/user/:userId/todos', async () => {
    let data: { userid: number; text: string };
    let user: { username: string; id: number; token: string };
    before(async () => {
        const username = 'test_username1';
        const password = 'test_password';
        user = await auth.createUser(username, password);
        data = { userid: user.id, text: 'test_text' };
    });
    it('it should return user todos', done => {
        request(app)
            .post(`/api/user/${user.id}/todos`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer: ${user.token}`)
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response: any) => {
                if (error) return done(error);
                expect(response.statusCode).to.equal(200);
                expect(response.body.data).to.be.an('array');
                expect(response.body.data.length).to.equal(1);
                expect(response.body.data[0].text).to.be.equal(data.text);
                expect(response.body.data[0].userid).to.be.equal(data.userid);
                done();
            });
    });
    after(async () => {
        await auth.removeUser(user.username);
        await todos.deleteUsersTodos(user.id);
    });
});

describe('GET /api/user/:userId/todos', async () => {
    let data: { userid: number; text: string };
    let user: { username: string; id: number; token: string };
    before(async () => {
        const username = 'test_username1';
        const password = 'test_password';
        user = await auth.createUser(username, password);
        data = { userid: user.id, text: 'test_text' };
        await todos.createTodo(user.id, data.text, false);
    });
    it('it should return user todos', done => {
        request(app)
            .get(`/api/user/${user.id}/todos`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer: ${user.token}`)
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response: any) => {
                if (error) return done(error);
                expect(response.statusCode).to.equal(200);
                expect(response.body.data).to.be.an('array');
                expect(response.body.data.length).to.equal(1);
                expect(response.body.data[0].text).to.be.equal(data.text);
                expect(response.body.data[0].userid).to.be.equal(data.userid);
                done();
            });
    });
    after(async () => {
        await auth.removeUser(user.username);
        await todos.deleteUsersTodos(data.userid);
    });
});
