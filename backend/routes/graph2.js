/* The SQL command to create the stored procedure

DELIMITER //

# returns at most 36 rows, the first 12 rows are month, the rest are hours
CREATE PROCEDURE get_crimeNum_month_hour(IN givenDivision VARCHAR(100))
BEGIN
    DECLARE hourLoopDone INT DEFAULT FALSE;
    DECLARE hour INT;
    DECLARE timeSlot VARCHAR(20);
    DECLARE crimeCount INT;
    # use loop for hour, month is a direct query
    DECLARE hourCursor CURSOR FOR (
		SELECT DISTINCT EXTRACT(HOUR FROM TimeOcc) 
		FROM Record 
		WHERE TimeOcc IS NOT NULL
	);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET hourLoopDone = TRUE;

    DROP TABLE IF EXISTS CombinedCrimeCount;
    CREATE TABLE CombinedCrimeCount (
        timeSlot VARCHAR(20),
        crimeNum INT
    );

    # Insert month crimeNum directly
    INSERT INTO CombinedCrimeCount (timeSlot, crimeNum)
    SELECT
		# want month to be 'Jan', 'Feb', ...
        DATE_FORMAT(DateOcc, '%b') AS 'timeSlot',
        COUNT(RecordId) AS 'crimeNum'
    FROM
        PoliceStation
        NATURAL JOIN District
        JOIN Record USING (DistrictId)
    WHERE
        Division = givenDivision
    GROUP BY
        DATE_FORMAT(DateOcc, '%b'),
        # if want order by, then 
        MONTH(DateOcc)
    ORDER BY
		# Can't use DATE_FORMAT(DateOcc, '%b'), it will be alphabetic order
        # Can't use 'timeSlot', order by is before column alias
        MONTH(DateOcc);

    # use looping and control for hour
    # use HW1 Grammar
    OPEN hourCursor;
    hourLoop: LOOP
        FETCH hourCursor INTO hour;
        IF hourLoopDone THEN
            LEAVE hourLoop;
        END IF;

		# want hour to be like '04:00:00-04:59:00'
        SET timeSlot = CONCAT(LPAD(hour, 2, '0'), ':00:00', 
							  '-', 
                              LPAD(hour, 2, '0'), ':59:00');

        SELECT 
			COUNT(RecordId) INTO crimeCount
        FROM 
			PoliceStation
			NATURAL JOIN District
			JOIN (
				SELECT *
				FROM Record
				WHERE DateOcc IS NOT NULL
			) AS tmp USING (DistrictId)
        WHERE Division = givenDivision AND
              EXTRACT(HOUR FROM TimeOcc) = hour;
		
        # only record hours with crimeCount > 0
        IF crimeCount > 0 THEN
			INSERT INTO CombinedCrimeCount (timeSlot, crimeNum) 
			VALUES (timeSlot, crimeCount);
		END IF;
    END LOOP hourLoop;
    CLOSE hourCursor;

    # Returning the combined results
    SELECT * FROM CombinedCrimeCount;
END//

DELIMITER ;

*/

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
        const sql = `CALL get_crimeNum_month_hour('${Division}');`;
        // use the promise version
        // db.query can't be behind the await, terminal doesn't allow me to do so
        let queryResult = await query(sql);
        // stored procedures return multiple result sets, the first one is the actual result
        // e.g. result: [[**actual result**],{"fieldCount":0,"affectedRows":0,"insertId":0,"info":"","serverStatus":34,"warningStatus":0}]
        let month_hour_result = queryResult[0];

        let monthPart = month_hour_result.slice(0, 12);

        // change the attribute name 'timeSlot' to 'month'
        let monthResult = monthPart.map(item => {
            let result = {...item};
            result.month = item.timeSlot;
            delete result.timeSlot;
            return result;
        });
        
        res.send(monthResult);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;