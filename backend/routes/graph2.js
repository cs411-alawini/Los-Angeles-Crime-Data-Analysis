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

// hour: a string denoting an hour, like '05'
// build the timeSlot, like '05:00:00-05:59:00'
function buildTimeSlot(hour) {
    const timeSlotStart = `${hour}:00:00`;
    const timeSlotEnd = `${hour}:59:00`;
    const timeSlot = `${timeSlotStart}-${timeSlotEnd}`;
    return timeSlot;
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
            hour = key;
            crimeNum = val;
            var timeSlot = buildTimeSlot(hour);
            results.push({'timeSlot': timeSlot, 'crimeNum': crimeNum})
        })

        res.send(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;