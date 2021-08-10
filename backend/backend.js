// import necessary modules
const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const createHttpError = require('http-errors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());
app.use(cors());

// middlewares

// testing if hosting works
app.get('/', (req, res, next) => {
    res.send("Hello World");
});

// login api
app.post('/login', (req, res, next) => {
    const username = req.query.username; // req.query from fetch
    const password = req.body.password; // req.body from fetch
    return connection.login(username, password) // call login from connection.js
        .then(function (response) {
            if(response.rows == 0){ // rows return is 0
                return res.status(401).json({ logged_in: false }); // send status 401 and logged in false to fetch call
            }
            else { // else
                return res.status(201).json({ logged_in: true }); // send status 201 and logged in true to fetch call
            }

        })
        .catch(next); // if caught an error go next
});

// signup api
app.post('/signup', (req, res, next) => {
    const Name = req.query.username; // req.query from fetch
    const Pass = req.body.password; // req.body from fetch
    return connection.signup(Name, Pass) // call signup from connection.js
        .then(function () {
            return res.status(201).json({ created: true }); // send status 201 and created true to fetch call
        })
        .catch(function (error) { // if error caught
            if (error.code === '23505') { // if error code is 23505
                return res.status(422).send({ message: 'Cannot insert duplicate values' })  // send status 422 and message
            }
        })
        .catch(next); // if error code not 23505 go next
});

// error handling
app.use((req, res, next) => next(createHttpError(404, `Unknown resource ${req.method} ${req.originalUrl}`)));

app.use(function (err, req, res, next) {
    console.error(err); // print err
    const status = err.status || 500; // status = err.status or 500
    const message = err.message || 'Unknown Error!'; // message = err.message or Unknown Error
    return res.status(status).json({
        error: message,     // send error message and code to fetch call
    });
});

const port = process.env.PORT || 8000 // backend listening on process.env.PORT or 8000
app.listen(port, () => {
    console.log(`App is listening on Port ${port}`) // print listening on this port
});
