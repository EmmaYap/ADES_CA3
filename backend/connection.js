// import required modules
const { Pool } = require('pg');
// url to database
const connectionString =
    'postgres://sadthqpndaytxe:56f1cd7852fb3cc3277ddc392ab5f419d431a7b37f8919c099ddd73850b0e99e@ec2-34-233-192-238.compute-1.amazonaws.com:5432/dcbfilcmabv344';
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString, // connect to rocess.env.DATABASE_URL or connectionString
    ssl: {
        rejectUnauthorized: false,  // reject ssl
    },
});

module.exports = class Profile {
    // login
    static login(username, password) {
        return pool.query(
            `
            SELECT * FROM Accounts 
            WHERE
            username = $1 AND
            password = $2
            `,
            [username, password],
        );
    }
    // signup
    static signup(username, password) {
        return pool.query(
            `
            INSERT INTO Accounts
            (username, password)
            VALUES
            ($1,$2)
            `,
            [username, password],
        );
    }
}