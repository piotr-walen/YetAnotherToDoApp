import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { ensureCorrectUser } from './middleware/auth';
import {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} from './controllers/todos';
import { notFoundHandler, errorHandler } from './controllers/error';
import { login, register } from './controllers/auth';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

const auth = require('./routes/auth');
app.use(auth);

app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.post('/api/user/:userId/todos', ensureCorrectUser, createTodo);
app.get('/api/user/:userId/todos/', ensureCorrectUser, getTodos);
app.put('/api/user/:userId/todos/:id', ensureCorrectUser, updateTodo);
app.delete('/api/user/:userId/todos/:id', ensureCorrectUser, deleteTodo);
app.use(notFoundHandler);
app.use(errorHandler);

const IP = String(process.env.IP);
const PORT = Number(process.env.PORT);
app.listen(PORT, IP, () => {
    console.log(`App is running on ${IP}:${PORT}`);
});
