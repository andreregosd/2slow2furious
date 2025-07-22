import express from 'express';
import pool from '../db.js';
import { DBErrorResponse } from '../ApiHelper.js';

const driversController = express.Router();

/**
 * Get drivers
 */
driversController.get('/', async (req, res) => {
    try {
        const drivers = await pool.query(`
            SELECT * FROM "Drivers";
        `);

        res.status(200).json(drivers.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 * Get drivers by season
 */
driversController.get('/:season_id', async (req, res) => {
    try {
        const season_id = req.params.season_id;

        const drivers = await pool.query(`
            SELECT d.* FROM "Drivers" d JOIN "Standings" s ON d.id = s.driver_id WHERE s.season_id = $1;
        `, [season_id]);

        res.status(200).json(drivers.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 * Create new driver.
 * 
 * @param Object {
 *      name : name,
 *      team_id : team_id
 * }
 */
driversController.post('/', async (req, res) => {
    try {
        const { name, team_id } = req.body;

        const result = await pool.query(`
            INSERT INTO "Drivers" ("name", "team_id") VALUES ($1, $2) RETURNING id;
        `, [name, team_id]);

        let driver_id = result.rows[0].id;

        res.status(200).json(SuccessResponse(driver_id));
    } catch(err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 * Add driver to season.
 * 
 * @param Object {
 *      driver_id : driver_id,
 *      season_id : season_id
 * }
 */
driversController.post('/addtoseason', async (req, res) => {
    try {
        const { driver_id, season_id } = req.body;

        const result = await pool.query(`
            INSERT INTO "Standings" ("season_id", "driver_id", "points_from_race", "points_from_bestlap", "points", "rank") 
            VALUES ($1, $2, 0, 0, 0, (SELECT MAX(rank) + 1 FROM "Standings" WHERE season_id = $1));
        `, [season_id, driver_id]);

        res.status(200).json(SuccessResponse());
    } catch(err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 * Add driver to team.
 * 
 * @param Object {
 *      driver_id : driver_id,
 *      team_id : team_id
 * }
 */
driversController.post('/addtoteam', async (req, res) => {
    try {
        const { driver_id, team_id } = req.body;

        const result = await pool.query(`
            UPDATE "Drivers" SET "team_id" = $1 WHERE "driver_id" = $2;
        `, [team_id, driver_id]);

        res.status(200).json(SuccessResponse());
    } catch(err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

export default driversController;