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

router.get('/', async function(req, res) {
    // doc says area, which should mean Division (a string)
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
        // use the promise version
        // db.query can't be behind the await, terminal doesn't allow me to do so
        let dateResult = await query(sql);

        // not sure if a dict is ok also
        var month_count = new Map();        

        // count crimNum of each month
        for (i = 0; i < dateResult.length; i++) {
            date = dateResult[i].DateOcc.toString();
            // see how toString works for date object
            // the format change after conversion from date to string
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