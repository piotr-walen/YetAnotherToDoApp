require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors');
app.use(cors());

const auth = require('./routes/auth');
app.use(auth);
const todos = require('./routes/todos');
app.use(todos);

app.use(function(request, response, next) {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function(error, request, response, next) {
    console.log(error);
    response.status(error.status || 500).send(error.message);
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`App is running on ${process.env.IP}:${process.env.PORT}`);
});
