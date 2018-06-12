import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { login, register } from './controllers/auth';
import { errorHandler, notFoundHandler } from './controllers/error';
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from './controllers/todos';
import { ensureCorrectUser } from './middleware/auth';
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.post('/api/user/:userId/todos', ensureCorrectUser, createTodo);
app.get('/api/user/:userId/todos/', ensureCorrectUser, getTodos);
app.put('/api/user/:userId/todos/:id', ensureCorrectUser, updateTodo);
app.delete('/api/user/:userId/todos/:id', ensureCorrectUser, deleteTodo);

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

export default app;