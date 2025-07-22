import express from 'express';
import pool from '../db.js';
import { SuccessResponse, DBErrorResponse } from '../ApiHelper.js';

const seasonsController = express.Router();

/**
 * Get seasons
 */
seasonsController.get('/', async (req, res) => {
    try {
        const seasons = await pool.query(`
            SELECT * FROM "Seasons";
        `);

        res.status(200).json(seasons.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 *  Create new season
 * 
 *  @param Object {
 *      name : name
 *  }
 */
seasonsController.post('/', async (req, res) => {
    try {
        const name = req.body.name;

        const result = await pool.query(`
            INSERT INTO "Seasons" ("name") VALUES ($1) RETURNING id;
        `, [name]);

        let season_id = result.rows[0].id;
        res.status(200).json(SuccessResponse(season_id));
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

export default seasonsController;