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

    // async typically use try catch, not then
    try {
        var results = []

        // get the dates of crimes happened in this Division
        const sql = `SELECT DateOcc
                     FROM PoliceStation 
                          NATURAL JOIN District
                          JOIN Record USING (DistrictId)
                     WHERE Division = '${Division}'`;
        let dateResult = await query(sql);

        var month_count = new Map();        

        // count crimNum of each month
        for (i = 0; i < dateResult.length; i++) {
            date = dateResult[i].DateOcc.toString();
            // see how toString works for date object
            month = date.substr(4, 3);

            if (month_count.has(month)) {
                month_count.set(month, month_count.get(month) + 1);
            }
            else {
                month_count.set(month, 1);
            }
        }

        // format and store the results
        month_count.forEach(function(val, key) {
            results.push({'month': key, 'crimeNum': val})
        })

        res.send(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;