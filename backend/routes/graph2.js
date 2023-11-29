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

// input: str of hour, e.g. '23'
// output: output: string of hour's start, e.g. '23:00:00'
function hourToHourStart(hourStr) {
    // e.g. for 5, I want it to be '05' after this step
    hourStr = hourStr.padStart(2, '0');
    // convert it to like time in MySQL
    var timeSlotStart = hourStr + ':00:00';
    return timeSlotStart;
}

// input: str of hour, e.g. '23'
// output: output: string of hour's end, e.g. '23:59:00'
function hourToHourEnd(hourStr) {
    // e.g. for 5, I want it to be '05' after this step
    hourStr = hourStr.padStart(2, '0');
    // convert it to like time in MySQL
    var timeSlotEnd = hourStr + ':59:00';
    return timeSlotEnd;
}

router.get('/', async function(req, res) {
    // doc says area, which should mean Division (a string)
    const Division = req.query.Division;

    // async typically use try catch, not then
    try {
        var results = []

        // get the dates of crimes happened in this Division
        const sql = `SELECT TimeOcc
                     FROM PoliceStation 
                          NATURAL JOIN District
                          JOIN Record USING (DistrictId)
                     WHERE Division = '${Division}'`;
        // use the promise version
        // db.query can't be behind the await, terminal doesn't allow me to do so
        let timeResult = await query(sql);

        // not sure if a dict is ok also
        var hour_count = new Map();   
        // ensure that (1) the key is sorted (2) even a timeSlot has no crime, it will be a key
        for (hour = 0; hour < 24; hour++) {
            hourStr = hour.toString().padStart(2, '0');
            hour_count.set(hourStr, 0);
        }     

        // count crimNum of each month
        for (i = 0; i < timeResult.length; i++) {
            time = timeResult[i].TimeOcc.toString();
            // see how toString works for time object
            // the format doesn't change. e.g. '02:06:00'
            hour = time.substr(0, 2);

            if (hour_count.has(hour)) {
                hour_count.set(hour, hour_count.get(hour) + 1);
            }
            else {
                hour_count.set(hour, 1);
            }
        }

        // format and store the results
        hour_count.forEach(function(val, key) {
            var timeSlotStart = hourToHourStart(key);
            var timeSlotEnd = hourToHourEnd(key);
            var timeSlot = `${timeSlotStart}-${timeSlotEnd}`;
            results.push({'timeSlot': timeSlot, 'crimeNum': val})
        })

        res.send(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;