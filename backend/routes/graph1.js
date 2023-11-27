var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res) {
    var sql = `SELECT Division, COUNT(*) 
               FROM Los_Angeles_Crime_Data.District D 
               NATURAL JOIN Los_Angeles_Crime_Data.PoliceStation PS 
               JOIN Los_Angeles_Crime_Data.Record R 
               ON D.DistrictId = R.DistrictId 
               GROUP BY PS.StationId;`
    console.log(sql);
    db.query(sql, function(err, result) {
        if(err) {
            res.send(err);
            return;
        }
        res.send(result);
    })
});

module.exports = router;