import express from 'express';
import pool from '../db.js';
import { SuccessResponse, DBErrorResponse } from '../ApiHelper.js';

const scoreboardsController = express.Router();

/**
 * Get scoreboards
 */
scoreboardsController.get('/', async (req, res) => {
    try {
        const scores = await pool.query(`
            SELECT * FROM "Scoreboards" s JOIN "ScoreboardsScores" ss ON s.id = ss.scoreboard_id ORDER BY s.id ASC, ss.score DESC;
        `);

        let results = [];
        let scoreboardIndex = -1;
        for(let i = 0; i < scores.rowCount; i++) {
            let score = scores.rows[i];

            if(!results.some(res => res.scoreboard_id === score.scoreboard_id)) {
                let scoreboard = { 
                    scoreboard_id : score.scoreboard_id,
                    name : score.name,
                    scores : []
                };

                scoreboardIndex++;
                results[scoreboardIndex] = scoreboard;
            }

            results[scoreboardIndex].scores.push({
                position : score.position,
                score : score.score
            });
        }

        res.status(200).json(results);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 *  Create new scoreboard. 
 * 
 *  @param Object {
 *      name : name,
 *      scores : [
 *          {
 *              position : position,
 *              score : score
 *          },
 *          ...
 *      ]
 *  }
 */
scoreboardsController.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        // START TRANSACTION
        await client.query('BEGIN');

        const { name, scores } = req.body;

        const result = await client.query(`
            INSERT INTO "Scoreboards" ("name") VALUES ($1) RETURNING id;
        `, [name]);

        let scoreboard_id = result.rows[0].id;

        for(let i = 0; i < scores.length; i++) {
            await client.query(`
                INSERT INTO "ScoreboardsScores" ("scoreboard_id", "position", "score") VALUES ($1, $2, $3);
            `, [scoreboard_id, scores[i].position, scores[i].score]);
        }

        await client.query('COMMIT');
        res.json(SuccessResponse(scoreboard_id));
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
    finally {
        client.release();
    }
});

/**
 *  Edit scoreboard. 
 * 
 *  @param Object {
 *      scoreboard_id : scoreboard_id,
 *      scores : [
 *          {
 *              position : position,
 *              score : score
 *          },
 *          ...
 *      ]
 *  }
 */
scoreboardsController.post('/edit', async (req, res) => {
    const client = await pool.connect();
    try {
        // START TRANSACTION
        await client.query('BEGIN');

        const { scoreboard_id, scores } = req.body;

        await client.query(`
            DELETE FROM "ScoreboardsScores" WHERE scoreboard_id = $1;
        `, [scoreboard_id]);

        for(let i = 0; i < scores.length; i++) {
            await client.query(`
                INSERT INTO "ScoreboardsScores" ("scoreboard_id", "position", "score") VALUES ($1, $2, $3);
            `, [scoreboard_id, scores[i].position, scores[i].score]);
        }

        await client.query('COMMIT');
        res.json(SuccessResponse());
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
    finally {
        client.release();
    }
});

export default scoreboardsController;