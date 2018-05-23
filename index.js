require('dotenv').config();
//Create items table
// require('./models/database')();

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const todo = require('./routes/todo');
app.use(todo);

app.use(function(error, request, response, next) {
    console.error(error.stack);
    response.status(500).send({ error: error.message });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`App is running on ${process.env.IP}:${process.env.PORT}`);
});
