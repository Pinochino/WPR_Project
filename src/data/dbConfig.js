const mysql = require('mysql2');
const fs = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config();

// Connect database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
}).promise();


// Executing a .sql setup file
(async function () {
    let content = await fs.readFile('./database.sql', { encoding: 'utf8' });
    let lines = content.split('\r\r');
    let tmp = '';
    for (let line of lines) {
        line = line.trim();
        tmp += line + '\r\n';
        if (line.endsWith(';')) {
            await connection.execute(tmp);
            tmp = '';
        }
    }
    await connection.end();
})

// Gracefully close the Node.js server
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received');
    console.log('Closing HTTP server and stop receiving requests...');
    app.close();
    console.log('Closing DB connection...');
    connection.end(function (err) {
        console.log('DB connection has been closed.');
        console.log('Goodbye');
        process.exit(0);
    })
})

connection.connect();

