import express from 'express';
import pool from '../db.js';
import { SuccessResponse, DBErrorResponse } from '../ApiHelper.js';

const standingsController = express.Router();

/**
 * Get standings by season id
 */
standingsController.get('/:season_id', async (req, res) => {
    try {
        const season_id = req.params.season_id;
        const standings = await pool.query(`
            SELECT row_number() OVER() AS rank, d.name AS name, t.name AS team, t.color AS teamColor, s.points AS pts FROM "Standings" s
            JOIN "Drivers" d ON s.driver_id = d.id
            LEFT JOIN "DriversTeams" dt ON d.id = dt.driver_id AND s.season_id = dt.season_id
            LEFT JOIN "Teams" t ON t.id = dt.team_id 
            WHERE s.season_id = $1 ORDER BY "points" DESC;
        `, [season_id]);

        res.status(200).json(standings.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 * Update standings of a season
 */
standingsController.post('/update', async (req, res) => {
    try {
        const season_id = req.body.season_id;
        
        const result = await pool.query(`
            CALL updateStandings($1);
        `, [season_id]);

        res.status(200).json(SuccessResponse());
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

export default standingsController;