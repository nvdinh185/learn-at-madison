'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'sakila',
    // port: 3306
});
console.log(connection.query);
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
connection.query(
    "SELECT * FROM actor",
    function (err, results, fields) {
        console.log(err);
        console.log(results);
        connection.end();
    }
);