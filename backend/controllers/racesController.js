import express from 'express';
import pool from '../db.js';
import { SuccessResponse, DBErrorResponse } from '../ApiHelper.js';

const racesController = express.Router();

/**
 * Get races
 */
racesController.get('/', async (req, res) => {
    try {
        const races = await pool.query(`
            SELECT * FROM "Races";
        `);

        res.status(200).json(races.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
        
    }
});

/**
 * Get races by season_id
 */
racesController.get('/:season_id', async (req, res, next) => {
    try {
        const season_id = req.params.season_id;

        const races = await pool.query(`
            SELECT * FROM "Races" WHERE "season_id" = $1;
        `, [season_id]);

        res.status(200).json(races.rows);
    } catch (err) {
        console.error('Error executing query: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 *  Create new race
 * 
 *  @param Object {
 *      season_id : season_id,
 *      race_name : race_name,
 *      scoreboard_id : scoreboard_id,
 *      best_lap_scoreboard_id : best_lap_scoreboard_id,
 *      race_date : race_date
 *  }
 */
racesController.post('/', async (req, res) => {
    try {
        const { season_id, race_name, scoreboard_id, best_lap_scoreboard_id, race_date } = req.body;

        const result = await pool.query(`
            INSERT INTO "Races" ("season_id", "name", "scoreboard_id", "best_lap_scoreboard_id", "race_date") 
            VALUES ($1, $2, $3, $4, $5) RETURNING id;
        `, [season_id, race_name, scoreboard_id, best_lap_scoreboard_id, race_date]);

        let race_id = result.rows[0].id;
        res.status(200).json(SuccessResponse(race_id));
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

export default racesController;