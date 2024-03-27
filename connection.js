const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Vikram@123",
    database:"mergetask"
    // database:"job_app_db_29"
    // database:"studentdata3"
}).promise();

module.exports = connection;
