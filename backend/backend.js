
const express = require('express');
const cors = require('cors');
var mysql = require('mysql');


var db = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "https://ades-ca3-hosting.herokuapp.com",
            user: "root",
            password: "99Ab12529",
            database: "ades_ca3"
        });

        return conn;
    }
};
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.options('*', cors());

const port = process.env.PORT || 8000

app.use(cors());


app.get('/', (req,res) => {
    res.send("Hello World");
})

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userDB.loginUser(username, password, function (err, result) {
        if (err) {
            res.status(500);
            res.send(err.statusCode);
        }
        else {
            if (!result) {
                var message = {
                    "Error": "Invalid Login"
                };

                res.status(401).send(message);
            }
            else {
                console.log(result)

                var userData = {
                    "username": result[0].username,
                    "userid": result[0].userid,
                    "email": result[0].email
                }

                var message = {
                    "UserData": JSON.stringify(userData)
                };
                res.status(201).send(message);
            }
        }
    })
});

app.listen(port,() => {
    console.log(`App is listening on Port ${port}`)
});


var userDB = {
    loginUser: function (username, password, callback) {

        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null, null);
            }
            else {
                console.log("Connected!");

                var sql = 'select userid, username, email from users where username=? and password=?';

                conn.query(sql, [username, password], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    if (result.length == 0) {

                        callback(null, null);
                        return;
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    }
};