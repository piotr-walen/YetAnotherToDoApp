import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

const auth = require('./routes/auth');
app.use(auth);
const todos = require('./routes/todos');
app.use(todos);

app.use(function(request: Request, response: Response, next: NextFunction) {
    let error = new Error('Not Found');
    next(error);
});

app.use(function(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    console.log(error);
    response.status(500).send({ error: error.message });
});
const IP = String(process.env.IP);
const PORT = Number(process.env.PORT);
app.listen(PORT, IP, () => {
    console.log(`App is running on ${IP}:${PORT}`);
});
