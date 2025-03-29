// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const pool = require('./db');

// Initialize environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Api endpoint example
app.get('/getTeams', async (req, res) => {
    try {
        const teams = await pool.query(`
            SELECT * FROM "Teams";
        `);
        res.json(teams.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send('Error retrieving teams');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
