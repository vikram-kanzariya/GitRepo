const mysql = require('mysql2');
const dotenv = require('dotenv');
require('dotenv').config();

const connection = mysql.createConnection({
    host:process.env.DB_HOST ,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:"mergetask",
    dateStrings:true
}).promise();

module.exports = connection;
