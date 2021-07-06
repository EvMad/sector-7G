require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({

    host:

    port:

    user: process.env.DB_USER,

    password:
    database:
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ${connection.threadId}');
    connection.end();
});