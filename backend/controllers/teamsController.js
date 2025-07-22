import express from 'express';
import pool from '../db.js';
import { DBErrorResponse, SuccessResponse } from '../ApiHelper.js';

const teamsController = express.Router();

/**
 * Get teams
 */
teamsController.get('/', async (req, res) => {
    try {
        const teams = await pool.query(`
            SELECT * FROM "Teams";
        `);

        res.status(200).json(teams.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 * Create new team.
 * 
 * @param Object {
 *      name : name,
 *      color : color
 * }
 */
teamsController.post('/', async (req, res) => {
    try {
        const { name, color } = req.body;

        const result = await pool.query(`
            INSERT INTO "Teams" ("name", "color") VALUES ($1, $2) RETURNING id;
        `, [name, color]);

        let team_id = result.rows[0].id;

        res.status(200).json(SuccessResponse(team_id));
    } catch(err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

export default teamsController;