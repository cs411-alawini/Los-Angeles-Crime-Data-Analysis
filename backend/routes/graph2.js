var express = require('express');
var router = express.Router();
var db = require('../db');

// my version of query: wrap db.query in a promise
function query(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

router.get('/', async function(req, res) {
    const Division = req.query.Division;
    // initialize to -1, will get it later
    var StationId = -1;

    // async typically use try catch, not then
    try {
        // get the StationId of the Division
        sql = `SELECT StationId
               FROM PoliceStation 
               WHERE Division = '${Division}'`;
        let stationResult = await query(sql);
        StationId = stationResult[0].StationId;
        
        // results collect the crimeNum of each timeSlot (1 hour each)
        var results = [];
        for (let hour = 0; hour < 24; hour++) {
            // format the time for MySQL use
            let timeSlotStart = hour.toString().padStart(2, '0') + ':00:00';
            let timeSlotEnd = hour.toString().padStart(2, '0') + ':59:00';
            
            sql = `SELECT COUNT(*) AS crimeNum
                   FROM Record NATURAL JOIN District
                   WHERE StationId = ${StationId}
                   AND TimeOcc BETWEEN '${timeSlotStart}' AND '${timeSlotEnd}'`;
            let crimeResult = await query(sql);
            
            // format and store this timeSlot's result to results
            let timeSlot = `${timeSlotStart}-${timeSlotEnd}`;
            let crimeNum = crimeResult[0].crimeNum;
            results.push({'timeSlot': timeSlot, 'crimeNum': crimeNum});
        }

        res.send(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
