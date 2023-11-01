# Database Implementation
## Screenshot of GCP-MySQL connection

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

## Rows in the database
 (inserting at least 1000 rows in the tables. (You should do a count query to show this, -1% for each missing table)

## Advance Query and Indexing Analysis
located in the [query](https://github.com/cs411-alawini/fa23-cs411-team037-Team37/blob/main/doc/DatabaseCreation/411%20Stage3-query.docx)

