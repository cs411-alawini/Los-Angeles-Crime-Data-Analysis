var express = require('express');
var router = express.Router();
var db = require('../db');

// my version of query: wrap db.query in a promise
// terminal doesn't allow me to put await before something that's not a promise
function query(sql) {
    return new Promise((resolve, reject) => {
        // though we check err in the main endpoint, not sure if we need to check it here
        // so check it here as well to be safe
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

// input: int of hour, e.g. 23
// output: output: string of hour's start, e.g. '23:00:00'
function intToHourStart(hour) {
    var hourStr = hour.toString();
    // e.g. for 5, I want it to be '05' after this step
    hourStr = hourStr.padStart(2, '0');
    // convert it to like time in MySQL
    var timeSlotStart = hourStr + ':00:00';
    return timeSlotStart;
}

// input: int of hour, e.g. 23
// output: output: string of hour's end, e.g. '23:59:00'
function intToHourEnd(hour) {
    var hourStr = hour.toString();
    // e.g. for 5, I want it to be '05' after this step
    hourStr = hourStr.padStart(2, '0');
    // convert it to like time in MySQL
    var timeSlotEnd = hourStr + ':59:00';
    return timeSlotEnd;
}

// use routers, so we can have only '/' here
// see app.js
router.get('/', async function(req, res) {
    // doc says area, which means Division column in our database
    const Division = req.query.Division;
    // initialize to -1, will get it later
    // find if there is a better way if having time in the future
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
            let timeSlotStart = intToHourStart(hour);
            let timeSlotEnd = intToHourEnd(hour);
            
            // query for curr timeSlot
            sql = `SELECT COUNT(*) AS crimeNum
                   FROM Record NATURAL JOIN District
                   WHERE StationId = ${StationId}
                   AND TimeOcc BETWEEN '${timeSlotStart}' AND '${timeSlotEnd}'`;
            // crimeResult should have only 1 row
            let crimeResult = await query(sql);
            
            // format and store this timeSlot's result to results
            let timeSlot = `${timeSlotStart}-${timeSlotEnd}`;
            let crimeNum = crimeResult[0].crimeNum;
            results.push({'timeSlot': timeSlot, 'crimeNum': crimeNum});
        }

        res.send(results);
    } catch (err) {
        // stackoverflow says 500 is internal server error, which I think is the cloest for this case
        res.status(500).send(err);
    }
});

module.exports = router;
