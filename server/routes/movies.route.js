const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();
let apiKey = '7ba5feeb1c69e54538affe7c9eea0403'

//POST new movie
router.post('/', (req, res) => {
    console.log(req.body);

    pool.query(
            `INSERT INTO "movies" ("title", "genre_id", "director", "released", "image_path", "db_id", "synopsis", "revenue", "runtime", "budget", "star1", "star2", "star3")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`, [
                req.body.title,
                req.body.genre_id,
                req.body.director,
                req.body.released,
                req.body.image_path,
                req.body.db_id,
                req.body.synopsis,
                req.body.revenue,
                req.body.runtime,
                req.body.budget,
                req.body.star1,
                req.body.star2,
                req.body.star3,
            ]
        )
        .then(function (PGres) {
            console.log('Response from PG:', PGres);
            res.sendStatus(201);

        })
        .catch(function (err) {
            console.log('Error during post:', err);
            res.sendStatus(500);
        });
});
//GET movies --also search?
router.get('/', (req, res) => {
    pool.query(`SELECT 
        movies.id, 
        movies.title, 
        genres.genre, 
        movies.db_id, 
        movies.genre_id, 
        movies.director, 
        movies.image_path, 
        movies.released,
        movies.synopsis,
        movies.revenue,
        movies.runtime,
        movies.budget,
        movies.star1,
        movies.star2,
        movies.star3
        FROM "movies"
        JOIN "genres" ON "genres".id = "movies".genre_id;`
    ).then(result => {
        res.send(result.rows);
            
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    });
});

//DELETE movie
router.delete('/:id', (req,res) => {
    console.log(req.params.id);
    
    pool.query(
        `DELETE FROM "movies" 
        WHERE "id" = $1;`, 
        [req.params.id]
    ).then( result => {
        res.sendStatus(200);
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
        
    });
});

//PUT movie
router.put('/', (req, res) => {
    console.log(req.body);
    pool.query(`UPDATE "movies" 
    SET "title" = $1, "genre_id" = $2, "db_id" = $3, "director" = $4, "image_path" = $5, "released" = $6 
    WHERE "id" = $7;`, [
        req.body.title, 
        req.body.genre_id, 
        req.body.db_id, 
        req.body.director, 
        req.body.image_path, 
        req.body.released, 
        req.body.id
    ]).then( result => {
        res.sendStatus(200);
    }).catch( err => {
        console.log(err);
        
        res.sendStatus(500);
    })
})

module.exports = router;