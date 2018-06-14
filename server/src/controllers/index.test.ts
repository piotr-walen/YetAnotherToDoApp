import request from 'supertest';
import app from '../index';
import { describe, it } from 'mocha';
import { expect } from 'chai';

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
