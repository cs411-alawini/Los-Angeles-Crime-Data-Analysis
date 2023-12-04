var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res) {
    var sql = `SELECT PremiseId, PremiseDesc
               FROM Los_Angeles_Crime_Data.Premise`;
    console.log(sql);
    db.query(sql, function(err, result) {
        if(err) {
            res.status(500).send({
                message: 'Server Error',
                data: []
            });
        } else {
            res.status(200).send({
                message: 'OK',
                data: result
            });
        }
    });
    return;
})

module.exports = router;