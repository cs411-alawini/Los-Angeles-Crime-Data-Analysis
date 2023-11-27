var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res) {
    const PageSize = 20;
    var FromDate = req.query.FromDate;
    var ToDate = req.query.ToDate;
    var Loc = req.query.Location;
    var CrimeType = req.query.CrimeType;
    var Page = req.query.Page;
    
    if(FromDate === undefined || ToDate === undefined) {
        res.status(400).send({
            message: 'FromDate and ToDate are mandatory',
            data: []
        });
        return;
    }

    var sql = `SELECT *
               FROM Los_Angeles_Crime_Data.Record R
               NATURAL JOIN Los_Angeles_Crime_Data.CrimeType C
               WHERE R.DateOcc >= ${FromDate}
               AND R.DateOcc <= ${ToDate}`;
    
    if(Loc !== undefined) {
        sql += ` AND R.Location LIKE '%${Loc}%'`;
    }

    if(CrimeType !== undefined) {
        sql += ` AND C.CrimeTypeDesc = '${CrimeType}'`;
    }

    if(Page !== undefined) {
        sql += ` LIMIT ${PageSize} OFFSET ${(Page-1)*PageSize}`;
    } else{
        sql += ` LIMIT ${PageSize}`;
    }
    
    console.log(sql);
    db.query(sql, function(err, result) {
        if(err) {
            res.status(500).send({
                message: err,
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
});

router.post('/', function(req, res) {
    var DateOcc = req.body.DateOcc;
    var TimeOcc = req.body.TimeOcc || '00:00:00';
    var Loc = req.body.Location || null;
    var Lat = req.body.Lat || null;
    var Lng = req.body.Lng || null;
    var RpdDistId = req.body.RpdDistId || null;
    var CrimeType = req.body.CrimeType || 'null';
    var PremiseType = req.body.PremiseType || 'null';
    var WeaponType = req.body.WeaponType || 'null';
    var VictimSex = req.body.VictimSex || 'X';
    var VictimAge = req.body.VictimAge || 0;
    var VictimDescent = req.body.VictimDescent || 'O';
    var Username = req.body.Username || 'Admin';

    if(DateOcc === undefined) {
        res.status(400).send({
            message: 'DateOcc is mandatory',
            data: []
        });
        return;
    }

    // Get today's date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    var idSQL = `SELECT MAX(RecordId) AS maxRecordId FROM Los_Angeles_Crime_Data.Record WHERE DateOcc >= '2023-01-01'`;

    var crimeSQL = 'SELECT CrimeTypeId FROM Los_Angeles_Crime_Data.CrimeType WHERE CrimeTypeDesc = ?';
    
    var premiseSQL = 'SELECT PremiseId FROM Los_Angeles_Crime_Data.Premise WHERE PremiseDesc = ?';
                    
    var weaponSQL = 'SELECT WeaponId FROM Los_Angeles_Crime_Data.Weapon WHERE WeaponDesc = ?';

    var victimSQL = 'INSERT INTO Los_Angeles_Crime_Data.Victim(Age, Sex, Descent) VALUES (?, ?, ?)';
    
    // Find the id of this new record
    var RecordId = 2300001;
    db.query(idSQL, function(err, result) {
        if(err) {
            res.status(500).send({
                message: err,
                data: []
            });
            return;
        } else {
            if(result[0].maxRecordId !== null) {
                RecordId = result[0].maxRecordId + 1;
            }

            // Find the CrimeTypeId
            var CrimeTypeId = null;
            db.query(crimeSQL, [CrimeType], function(err, result) {
                if(err) {
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                    return;
                } else {
                    if(result.length !== 0) {
                        CrimeTypeId = result[0].CrimeTypeId;
                    }
                    
                    // Find the PremiseId
                    var PremiseId = null;
                    db.query(premiseSQL, [PremiseType], function(err, result) {
                        if(err) {
                            res.status(500).send({
                                message: err,
                                data: []
                            });
                            return;
                        } else {
                            if(result.length !== 0) {
                                PremiseId = result[0].PremiseId;
                            }

                            // Find the WeaponId
                            var WeaponId = null;
                            db.query(weaponSQL, [WeaponType], function(err, result) {
                                if(err) {
                                    res.status(500).send({
                                        message: err,
                                        data: []
                                    });
                                    return;
                                } else {
                                    if(result.length !== 0) {
                                        WeaponId = result[0].WeaponId;
                                    }
                                        
                                    // Find the VictimId
                                    var VictimId = 0;
                                    db.query(victimSQL, [VictimAge, VictimSex, VictimDescent], function(err, result) {
                                        if(err) {
                                            res.status(500).send({
                                                message: err,
                                                data: []
                                            });
                                            return;
                                        } else {
                                            VictimId = result.insertId;

                                            // Finally insert the record
                                            var finalSQL = 'INSERT INTO Los_Angeles_Crime_Data.Record VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';                                    
                                            db.query(finalSQL, [RecordId, today, DateOcc, TimeOcc, Loc, Lat, Lng, RpdDistId, CrimeTypeId, PremiseId, WeaponId, VictimId, Username], function(err, result) {
                                                if(err) {
                                                    res.status(500).send({
                                                        message: err,
                                                        data: []
                                                    });
                                                    return;
                                                } else {
                                                    res.status(200).send({
                                                        message: 'OK',
                                                        data: result
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    return;
})

router.put('/:recordID', function(req, res) {
    var RecordId = parseInt(req.params.recordID, 10);
    var DateRptd = req.body.DateRptd;
    var DateOcc = req.body.DateOcc;
    var TimeOcc = req.body.TimeOcc;
    var Loc = req.body.Location;
    var Lat = req.body.Lat;
    var Lng = req.body.Lng;
    var RpdDistId = req.body.RpdDistId;
    var CrimeType = req.body.CrimeType || 'null';
    var PremiseType = req.body.PremiseType || 'null';
    var WeaponType = req.body.WeaponType || 'null';
    var VictimSex = req.body.VictimSex;
    var VictimAge = req.body.VictimAge;
    var VictimDescent = req.body.VictimDescent;

    var crimeSQL = 'SELECT CrimeTypeId FROM Los_Angeles_Crime_Data.CrimeType WHERE CrimeTypeDesc = ?';
    
    var premiseSQL = 'SELECT PremiseId FROM Los_Angeles_Crime_Data.Premise WHERE PremiseDesc = ?';
                    
    var weaponSQL = 'SELECT WeaponId FROM Los_Angeles_Crime_Data.Weapon WHERE WeaponDesc = ?';

    var recordSQL = 'UPDATE Los_Angeles_Crime_Data.Record SET';

    var recordSQLParams = [];

    if(DateRptd !== undefined) {
        recordSQL += ' DateRptd = ?,';
        recordSQLParams.push(DateRptd);
    }
    if(DateOcc !== undefined) {
        recordSQL += ' DateOcc = ?,';
        recordSQLParams.push(DateOcc);
    }
    if(TimeOcc !== undefined) {
        recordSQL += ' TimeOcc = ?,';
        recordSQLParams.push(TimeOcc);
    }
    if(Loc !== undefined) {
        recordSQL += ' Location = ?,';
        recordSQLParams.push(Loc);
    }
    if(Lat !== undefined) {
        recordSQL += ' Latitude = ?,';
        recordSQLParams.push(Lat);
    }
    if(Lng !== undefined) {
        recordSQL += ' Longitude = ?,';
        recordSQLParams.push(Lng);
    }
    if(RpdDistId !== undefined) {
        recordSQL += ' DistrictId = ?,';
        recordSQLParams.push(RpdDistId);
    }

    var newCrimeId = 0;
    var newPremiseId = 0;
    var newWeaponId = 0;
    db.query(crimeSQL, [CrimeType], function(err, result) {
        if(err) {
            res.status(500).send({
                message: err,
                data: []
            });
            return;
        } else {
            if(result.length !== 0) {
                newCrimeId = result[0].CrimeTypeId;
            }
            
            db.query(premiseSQL, [PremiseType], function(err, result) {
                if(err) {
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                    return;
                } else {
                    if(result.length !== 0) {
                        newPremiseId = result[0].PremiseId;
                    }

                    db.query(weaponSQL, [WeaponType], function(err, result) {
                        if(err) {
                            res.status(500).send({
                                message: err,
                                data: []
                            });
                            return;
                        } else {
                            if(result.length !== 0) {
                                newWeaponId = result[0].WeaponId;
                            }

                            if(newCrimeId !== 0) {
                                recordSQL += ' CrimeTypeId = ?,';
                                recordSQLParams.push(newCrimeId);
                            }
                            if(newPremiseId !== 0) {
                                recordSQL += ' PremiseId = ?,';
                                recordSQLParams.push(newPremiseId);
                            }
                            if(newWeaponId !== 0) {
                                recordSQL += ' WeaponId = ?,';
                                recordSQLParams.push(newWeaponId);
                            }

                            if(recordSQLParams.length !== 0) {
                                recordSQL = recordSQL.slice(0, -1);
                                recordSQL += ' WHERE RecordId = ?';
                                recordSQLParams.push(RecordId);
                                db.query(recordSQL, recordSQLParams, function(err, result) {
                                    if(err) {
                                        res.status(500).send({
                                            message: err,
                                            data: []
                                        });
                                        return;
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });

    
    var victimIdSQL = 'SELECT VictimId FROM Los_Angeles_Crime_Data.Record WHERE RecordId = ?';

    var victimSQL = 'UPDATE Los_Angeles_Crime_Data.Victim SET';

    var victimSQLParams = [];

    if(VictimAge !== undefined) {
        victimSQL += ' Age = ?,';
        victimSQLParams.push(VictimAge);
    }
    if(VictimSex !== undefined) {
        victimSQL += ' Sex = ?,';
        victimSQLParams.push(VictimSex);
    }
    if(VictimDescent !== undefined) {
        victimSQL += ' Descent = ?,';
        victimSQLParams.push(VictimDescent);
    }
    var VictimId = 0;
    db.query(victimIdSQL, [RecordId], function(err, result) {
        if(err) {
            res.status(500).send({
                message: err,
                data: []
            });
            return;
        } else {
            VictimId = result[0].VictimId;
            if(victimSQLParams.length !== 0) {
                victimSQL = victimSQL.slice(0, -1);
                victimSQL += 'WHERE VictimId = ?';
                victimSQLParams.push(VictimId);
                db.query(victimSQL, victimSQLParams, function(err, result) {
                    if(err) {
                        res.status(500).send({
                            message: err,
                            data: []
                        });
                        return;
                    }
                });
            }
        }
    });
    res.status(200).send({
        message: 'OK',
        data: []
    });
    return;
});

router.delete('/:recordID', function(req, res) {
    var RecordId = parseInt(req.params.recordID, 10);
    var VictimId = 0;
    var getRecordSQL = 'SELECT VictimId FROM Los_Angeles_Crime_Data.Record WHERE RecordId = ?';
    var delRecordSQL = 'DELETE FROM Los_Angeles_Crime_Data.Record WHERE RecordId = ?';
    var delVictimSQL = 'DELETE FROM Los_Angeles_Crime_Data.Victim WHERE VictimId = ?';
    db.query(getRecordSQL, [RecordId], function(err, result) {
        if(err) {
            res.status(500).send({
                message: "Invalid RecordId",
                data: []
            });
            return;
        } else {
            VictimId = result[0].VictimId;
            
            db.query(delRecordSQL, [RecordId], function(err, result) {
                if(err) {
                    res.status(500).send({
                        message: "Invalid RecordId",
                        data: []
                    });
                    return;
                } else {
                    db.query(delVictimSQL, [VictimId], function(err, result) {
                        if(err) {
                            res.status(500).send({
                                message: "Invalid VictimId",
                                data: []
                            });
                            return;
                        } else {
                            res.status(200).send({
                                message: "OK",
                                data: []
                            });
                        }
                    });
                }
            });
        }
    });
    return;
});

module.exports = router;