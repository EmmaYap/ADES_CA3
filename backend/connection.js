const { Pool } = require('pg');
const connectionString =
    'postgres://sadthqpndaytxe:56f1cd7852fb3cc3277ddc392ab5f419d431a7b37f8919c099ddd73850b0e99e@ec2-34-233-192-238.compute-1.amazonaws.com:5432/dcbfilcmabv344';
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = class Profile {

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