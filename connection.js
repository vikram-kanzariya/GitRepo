const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Vikram@123",
    database:"mergetask",
    dateStrings:true
}).promise();

module.exports = connection;
