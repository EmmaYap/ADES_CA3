const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const createHttpError = require('http-errors');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.options('*', cors());
app.use(cors());


app.get('/', (req, res, next) => {
    res.send("Hello World");
});

app.post('/login', (req, res, next) => {
    const username = req.query.username;
    const password = req.body.password;
    return connection.login(username, password)
        .then(function () {
            return res.status(201).send({ username: username, password: password });
        })
        // .catch(function (error){
            
        // })
        .catch(next);
});

app.post('/signup', (req, res, next) => {
    const Name = req.query.username;
    const Pass = req.body.password;
    return connection.signup(Name, Pass)
        .then(function () {
            return res.status(201).json({logged_in: true});
        })
        .catch(function (error){
            if (error.code === '23505'){
                return res.status(422).send({message : 'Cannot insert duplicate values'})
            }
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
