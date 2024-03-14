const mysql = require("mysql");
const dbConfig = require("./db.config");

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Thực hiện truy vấn cơ sở dữ liệu
pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
        console.error('Database connection failed:', error);
        return;
    }
    console.log('Successfully connected to the database. Result:', results[0].solution);
});

module.exports = pool;
