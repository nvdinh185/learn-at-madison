'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'mydb',
});
console.log(connection.query);
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
connection.query(
    "SELECT * FROM users1",
    function (err, results, fields) {
        console.log(err);
        console.log(results);
        connection.end();
    }
);