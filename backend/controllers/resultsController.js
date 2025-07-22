import express from 'express';
import pool from '../db.js';
import { SuccessResponse, DBErrorResponse } from '../ApiHelper.js';

const resultsController = express.Router();

/**
 * Get races results by season_id
 */
resultsController.get('/:season_id', async (req, res) => {
    try {
        const season_id = req.params.season_id;

        const racesResults = await pool.query(`
            SELECT r.id AS race_id, r.name AS gp, s.name AS season, r.race_date AS date, d.name AS driver, t.name AS team, t.color AS teamColor, res.rank AS rank, res.avg_time AS avg, res.laps AS laps, res.best_lap AS best_lap, score1.score + score2.score AS pts
            FROM "RacesResults" res
            JOIN "Races" r ON res.race_id = r.id
            JOIN "Seasons" s ON r.season_id = s.id
            JOIN "Drivers" d ON res.driver_id = d.id
            JOIN "Teams" t ON d.team_id = t.id
            JOIN "ScoreboardsScores" score1 ON r.scoreboard_id = score1.scoreboard_id AND score1.position = res.rank
            JOIN (SELECT row_number() OVER(PARTITION BY "race_id") AS best_lap_rank, race_id, driver_id FROM "RacesResults" ORDER BY best_lap) AS res2 ON res.race_id = res2.race_id AND res.driver_id = res2.driver_id 
            JOIN "ScoreboardsScores" score2 ON r.best_lap_scoreboard_id = score2.scoreboard_id AND score2.position = res2.best_lap_rank
            WHERE r."season_id" = $1 ORDER BY r.id;
        `, [season_id]);

        let results = [];
        let raceIndex = -1;
        for(let i = 0; i < racesResults.rowCount; i++) {
            let raceResult = racesResults.rows[i];

            // Add race info in the results if it doesn't exist yet
            if(!results.some(res => res.race_id === raceResult.race_id)) {
                let race = { 
                    race_id : raceResult.race_id, 
                    gp : raceResult.gp, 
                    season : raceResult.season, 
                    date : raceResult.date, 
                    results : []
                };

                raceIndex++;
                results[raceIndex] = race;
            }

            results[raceIndex].results.push({
                rank : raceResult.rank,
                driver : raceResult.driver,
                team : raceResult.team,
                teamColor : raceResult.teamColor,
                avg : raceResult.avg,
                laps : raceResult.laps,
                best_lap : raceResult.best_lap,
                pts : raceResult.pts
            });
        }

        res.status(200).json(results);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

/**
 *  Add results of a race. 
 *  If the race_id is not provided, a new race will be created with the given info.
 *  If neither the race_id nor the race info is provided, the method will fail.
 * 
 *  @param Object {
 *      season_id : season_id,
 *      race_name : race_name,
 *      scoreboard_id : scoreboard_id,
 *      best_lap_scoreboard_id : best_lap_scoreboard_id,
 *      race_date : race_date
 *      results : [
 *          {
 *              driver_id : driver_id,
 *              rank : rank,
 *              laps : laps,
 *              avg_time : avg_time,
 *              best_lap : best_lap
 *          },
 *          ...
 *      ]
 *  }
 */
resultsController.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        let race_id = req.body.race_id;

        // START TRANSACTION
        await client.query('BEGIN');

        // If no race_id, create the race with the given info
        if(!race_id) {
            const { season_id, race_name, scoreboard_id, best_lap_scoreboard_id, race_date } = req.body;

            const result = await client.query(`
                INSERT INTO "Races" ("season_id", "name", "scoreboard_id", "best_lap_scoreboard_id", "race_date") 
                VALUES ($1, $2, $3, $4, now()) RETURNING id;
            `, [season_id, race_name, scoreboard_id, best_lap_scoreboard_id]);

            race_id = result.rows[0].id;
        }

        const results = req.body.results;
        for(let i = 0; i < results.length; i++) {
            await client.query(`
                INSERT INTO "RacesResults" ("race_id", "driver_id", "rank", "laps", "avg_time", "best_lap") VALUES ($1, $2, $3, $4, $5, $6);
            `, [race_id, results[i].driver_id, results[i].rank, results[i].laps, results[i].avg_time, results[i].best_lap]);
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

export default resultsController;