const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const createHttpError = require('http-errors');

const app = express();

app.options('*', cors());



app.use(cors());


app.get('/', (req, res, next) => {
    res.send("Hello World");
});

app.post('/login', (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
    return connection.login(username, password)
        .then(function () {
            return res.status(201).json({ 'User': username });
        })
        .catch(next);
});

app.post('/signup', (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
    return connection.signup(username, password)
        .then(function () {
            return res.status(201).json({'User': username, 'Password': password});
        })
        .catch(next);
});

app.use((req, res, next) => next(createHttpError(404, `Unknown resource ${req.method} ${req.originalUrl}`)));

app.use(function (err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Unknown Error!';
    return res.status(status).json({
        error: message,
    });
});

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`App is listening on Port ${port}`)
});
