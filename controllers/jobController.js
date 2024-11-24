const db = require('../config/db');

exports.getJobs = (req, res) => {
    const sql = 'SELECT * FROM jobs';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createJob = (req, res) => {
    const { title, description } = req.body;
    const sql = 'INSERT INTO jobs (title, description) VALUES (?, ?)';
    db.query(sql, [title, description], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Job added successfully!', jobId: results.insertId });
    });
};