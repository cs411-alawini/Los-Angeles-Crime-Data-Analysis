# Database Design

## Database Connection Screenshots

<img src="./fig/showDatabases.png" style="zoom: 30%;" /> <img src="./fig/showTables.png" style="zoom: 30%;" />

## Data Definition Language (DDL) Commands

CREATE TABLE PoliceStation (\
&nbsp;&nbsp;&nbsp;&nbsp;StationId INT PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;Division VARCHAR(100),\
&nbsp;&nbsp;&nbsp;&nbsp;Location VARCHAR(100),\
&nbsp;&nbsp;&nbsp;&nbsp;Latitude DECIMAL(7, 4),\
&nbsp;&nbsp;&nbsp;&nbsp;Longitude DECIMAL(7, 4)\
);

CREATE TABLE District (\
&nbsp;&nbsp;&nbsp;&nbsp;DistrictId INT PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;Name VARCHAR(100),\
&nbsp;&nbsp;&nbsp;&nbsp;Bureau VARCHAR(100),\
&nbsp;&nbsp;&nbsp;&nbsp;StationId INT,\
&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (StationId) REFERENCES PoliceStation(StationId)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE CASCADE\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE\
);

CREATE TABLE CrimeType (\
&nbsp;&nbsp;&nbsp;&nbsp;CrimeTypeId INT PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;CrimeTypeDesc VARCHAR(100),\
&nbsp;&nbsp;&nbsp;&nbsp;Part CHAR(1)\
);

CREATE TABLE Premise (\
&nbsp;&nbsp;&nbsp;&nbsp;PremiseId INT PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;PremiseDesc VARCHAR(100)\
);

CREATE TABLE Weapon (\
&nbsp;&nbsp;&nbsp;&nbsp;WeaponId INT PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;WeaponDesc VARCHAR(100)\
);

CREATE TABLE Victim (\
&nbsp;&nbsp;&nbsp;&nbsp;VictimId INT PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;Age INT,\
&nbsp;&nbsp;&nbsp;&nbsp;Sex CHAR(1),\
&nbsp;&nbsp;&nbsp;&nbsp;Descent CHAR(1)\
);

CREATE TABLE User (\
&nbsp;&nbsp;&nbsp;&nbsp;UserName VARCHAR(100) PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;Password VARCHAR(100)\
);

CREATE TABLE Record (\
&nbsp;&nbsp;&nbsp;&nbsp;RecordId INT PRIMARY KEY,\
&nbsp;&nbsp;&nbsp;&nbsp;DateRptd DATE,\
&nbsp;&nbsp;&nbsp;&nbsp;DateOcc DATE,\
&nbsp;&nbsp;&nbsp;&nbsp;TimeOcc TIME,\
&nbsp;&nbsp;&nbsp;&nbsp;Location VARCHAR(50),\
&nbsp;&nbsp;&nbsp;&nbsp;Latitude DECIMAL(7, 4),\
&nbsp;&nbsp;&nbsp;&nbsp;Longitude DECIMAL(7, 4),\
&nbsp;&nbsp;&nbsp;&nbsp;DistrictId INT,\
&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (DistrictId) REFERENCES District(DistrictId)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE CASCADE\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE,\
&nbsp;&nbsp;&nbsp;&nbsp;CrimeTypeId INT,\
&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (CrimeTypeId) REFERENCES CrimeType(CrimeTypeId)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE CASCADE\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE,\
&nbsp;&nbsp;&nbsp;&nbsp;PremiseId INT,\
&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (PremiseId) REFERENCES Premise(PremiseId)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE CASCADE\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE,\
&nbsp;&nbsp;&nbsp;&nbsp;WeaponId INT,\
&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (WeaponId) REFERENCES Weapon(WeaponId)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE CASCADE\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE,\
&nbsp;&nbsp;&nbsp;&nbsp;VictimId INT,\
&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (VictimId) REFERENCES Victim(VictimId)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE CASCADE\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE,\
&nbsp;&nbsp;&nbsp;&nbsp;UserName VARCHAR(100),\
&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (UserName) REFERENCES User(UserName)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE CASCADE\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE\
);

## Table Row Counts

We have inserted the real dataset into our database, so several tables' row count is <1000. However, averagely, the rows we inserted into each table are >>1000 (e.g. Record has 317804 rows).

<img src="./fig/rowCount1.png" style="zoom: 30%;" />
<img src="./fig/rowCount2.png" style="zoom: 30%;" />

## Advance Query 
### Query 1
This query provides a list of the top 15 police stations with the highest number of reported crimes, along with their respective locations and the total crime counts.

SELECT P.StationId, P.Location, COUNT(*) AS TotalCrimes \
FROM Los_Angeles_Crime_Data.Record R \
JOIN Los_Angeles_Crime_Data.District D ON R.DistrictId = D.DistrictId \
JOIN Los_Angeles_Crime_Data.PoliceStation P ON P.StationId = D.StationId \
GROUP BY P.StationId, P.Location \
ORDER BY TotalCrimes DESC \
LIMIT 15;

<img src="./fig/query1ss.png" style="zoom: 30%;" />

### Query 2 
This query provides a list of the top 15 crime types that occurred in Los Angeles in 2020, ranked by their frequency, giving a clear picture of the most prevalent crimes in that year.

SELECT YEAR(R.DateOcc) AS Year, \
	   CT.CrimeTypeDesc, \
       COUNT(*) AS TotalCrimes \
FROM Los_Angeles_Crime_Data.Record R \
JOIN Los_Angeles_Crime_Data.CrimeType CT ON R.CrimeTypeId = CT.CrimeTypeId \
WHERE YEAR(R.DateOcc) = 2020 \
GROUP BY YEAR(R.DateOcc), CT.CrimeTypeDesc \
ORDER BY TotalCrimes DESC \
LIMIT 15; 

<img src="./fig/query2ss.png" style="zoom: 30%;" />

### Query 3

This query highlights which specific demographics (in terms of age and sex) were most impacted by crime in Los Angeles in 2021.

SELECT V.Sex, CASE \
				  WHEN V.Age BETWEEN 0 AND 10 THEN '0-10' \
                  WHEN V.Age BETWEEN 10 AND 20 THEN '10-20' \
                  WHEN V.Age BETWEEN 20 AND 30 THEN '20-30' \
                  WHEN V.Age BETWEEN 30 AND 40 THEN '30-40' \
                  WHEN V.Age BETWEEN 40 AND 50 THEN '40-50' \
				  WHEN V.Age BETWEEN 50 AND 60 THEN '50-60' \
				  WHEN V.Age BETWEEN 60 AND 70 THEN '60-70' \
				  ELSE '70+' \
			  END AS AgeGroup, \
       COUNT(*) AS NumberOfCrimes \
FROM Los_Angeles_Crime_Data.Record R \
JOIN Los_Angeles_Crime_Data.Victim V ON R.VictimId = V.VictimId \
WHERE YEAR(R.DateOcc) =2021 \
GROUP BY V.Sex, AgeGroup \
ORDER BY NumberOfCrimes DESC \
LIMIT 15;

<img src="./fig/query3ss.png" style="zoom: 30%;" />

## Indexing Analysis
Details are in [index analysis pdf](https://github.com/cs411-alawini/fa23-cs411-team037-Team37/blob/main/doc/DatabaseCreation/IndexAnalysis.pdf)

