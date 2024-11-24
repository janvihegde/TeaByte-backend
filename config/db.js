const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teabyte'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Database Connected.');
});

module.exports = db;