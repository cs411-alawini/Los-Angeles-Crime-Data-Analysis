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
        // call the stored procedure get_crimeNum_month(IN givenDivision)
        // return crimeNum of each month, the month is formatted like 'Jan', 'Feb'
        const sql = `CALL get_crimeNum_month('${Division}');`;
        // use the promise version
        // db.query can't be behind the await, terminal doesn't allow me to do so
        let result = await query(sql);

        // stored procedures return multiple result sets, the first one is the actual result
        // e.g. result: [[**actual result**],{"fieldCount":0,"affectedRows":0,"insertId":0,"info":"","serverStatus":34,"warningStatus":0}]
        res.send(result[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;