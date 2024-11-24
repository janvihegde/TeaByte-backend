const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teabyte'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
