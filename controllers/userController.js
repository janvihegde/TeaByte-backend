const db = require('../config/db');

exports.getUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createUser = (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, results) => {
        if (err) throw err;
        res.json({ message: 'User registered successfully!', userId: results.insertId });
    });
};
