'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'vinaenter',
});
// console.log(connection.query);
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
connection.query(
    "SELECT * FROM users",
    function (err, results, fields) {
        console.log(err);
        console.log(results);
        connection.end();
    }
);