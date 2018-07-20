const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();
let apiKey ='7ba5feeb1c69e54538affe7c9eea0403'

//Add new genre POST
router.post('/', (req, res)=> {
    console.log('Got to POST');
    console.log(req.body.newGenre);
    
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
    console.log('Got to GET');
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
    console.log('Got to GET');
    pool.query(`SELECT * FROM "genres";`
    ).then( result => {
        res.send(result.rows);
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    });
});
//DELETE genre



module.exports = router;