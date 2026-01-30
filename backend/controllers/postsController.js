import express from 'express';
import pool from '../db.js';
import { SuccessResponse, DBErrorResponse } from '../ApiHelper.js';

const postsController = express.Router();

/**
 * Get posts
 */
postsController.get('/', async (req, res) => {
    try {
        const posts = await pool.query(`
            SELECT * FROM "Posts";
        `);

        res.status(200).json(posts.rows);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message)); 
    }
});

/**
 * Get last post
 */
postsController.get('/last', async (req, res) => {
    try {
        const posts = await pool.query(`   
            SELECT * FROM "Posts" ORDER BY id DESC LIMIT 1;
        `);

        let result = posts.rows.length > 0 ? posts.rows[0] : {};

        res.status(200).json(result);
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message)); 
    }
});

/**
 *  Create new post
 * 
 *  @param Object {
 *      title : title,
 *      subtitle : subtitle,
 *      text : text
 *  }
 */
postsController.post('/', async (req, res) => {
    try {
        const { title, subtitle, text } = req.body;

        const result = await pool.query(`
            INSERT INTO "Posts" ("title", "subtitle", "text") VALUES ($1, $2, $3) RETURNING id;
        `, [title, subtitle, text]);

        let post_id = result.rows[0].id;
        res.status(200).json(SuccessResponse(post_id));
    } catch (err) {
        console.error('Error executing query. Error: ', err.message);
        res.status(500).send(DBErrorResponse(err.message));
    }
});

export default postsController;