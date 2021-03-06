const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();

//for reference: apiKey ='7ba5feeb1c69e54538affe7c9eea0403'

//Add new genre POST
router.post('/', (req, res)=> {
    
    pool.query(`INSERT INTO "genres" ("genre") 
        VALUES ($1);`, [req.body.newGenre]
    ).then(result => {
        res.sendStatus(200);
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    });
    
});

//GET genres -- also search?
router.get('/count', (req, res)=> {
    pool.query(`SELECT "genres".genre, count(*) as "movies_in_genre" 
        FROM "genres"
        JOIN "movies" ON "movies".genre_id = "genres".id
        GROUP BY "genres".genre;`
    ).then( result => {
        res.send(result.rows);
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/list', (req, res)=> {
    pool.query(`SELECT * FROM "genres";`
    ).then( result => {
        res.send(result.rows);
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    });
});
//DELETE genre
router.delete( '/:genre', (req, res) =>{
    pool.query(
        `DELETE FROM "genres" WHERE "genre" = $1;`,[
            req.params.genre
        ]
    ).then(result => {
        res.sendStatus(200);
    }).catch( err => {
        console.log(err);
        
        res.send(500);
    })
})


module.exports = router;