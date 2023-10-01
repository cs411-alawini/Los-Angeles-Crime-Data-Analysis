## UML Diagram

<img src="./fig/UML.png" style="zoom: 75%;" />

## Assumption

We assume that:

+ PoliceStation: For each PoliceStation, there is at least 1 district managed by it.
+ District: For each District, it's managed by exactly 1 PoliceStation.
+ CrimeType: The same type of Crime can happen in multiple Records.
+ Premise: The same Premise can appear in multiple Records.
+ Weapon: The same type of Weapon can be used in multiple crime Records.
+ User: Each user can provide any number of crime Records.
+ Record: For each crime Record, it includes exactly 1 District, at most 1 CrimeType, Premise and Weapon. It should be provided by exactly 1 user.

## Description

+ managed by: Each District is managed by exactly 1 PoliceStation, while each PoliceStation manages at least one District.
+ reported in: Each crime Record is reported to exactly 1 District, while each District may get involved in any number of Records.
+ provided by: Each crime Record is provided by exactly 1 User, while each User may provide any number of Records.
+ use: Each crime Record uses at most 1 Weapon, while each Weapon is used in any number of crime Records.
+ occur in: Each crime Record occurs in at most 1 Premise, while each Premise may get involved in any number of crime Records.
+ crime type: Each crime Record includes at most 1 CrimeType, while each CrimeType may happen in any number of crime Records.


## Cardinality

+ `User` to `Record` : one-to-many (One user reports many records)
+ `District` to `Record` : one-to-many (One district has many records)
+ `Police Station` to `District`: one-to-many (One police station manages many district)
+ `Weapon` to `Record` : one-to-many (One weapon can appear in many records)
+ `Premise` to `Record` : one-to-many (One premise can appear in many records)
+ `Crime Type` to `Record` : one-to-many (One crime type can appear in many records)

## Relational Schema

Table-PoliceStation(
StationId: INT [PK],
Division: VARCHAR(100),
Location: VARCHAR(200),
Latitude: DECIMAL(7,4),
Longitude: DECIMAL(7,4)
)

Table-District(
DistrictId: INT [PK],
Name: VARCHAR(100),
Bureau: VARCHAR(100),
StationId: INT [FK to PoliceStation.StationId]
)

Table-Weapon(
WeaponId: INT [PK],
WeaponDesc: VARCHAR(200)
)

Table-Premise(
PremiseId: INT [PK],
PremiseDesc: VARCHAR(200)
)

Table-Victim(
VictimId: INT [PK],
Age: INT,
Sex: CHAR(1),
Descent: CHAR(1)
)

Table-Record(
RecordId: INT [PK],
DateRptd: DATE,
DateOcc: DATE,
TimeOcc: TIME,
Location: VARCHAR(200),
Latitude: DECIMAL(7,4),
Longitude: DECIMAL(7,4),
DistrictId: INT [FK to District.DistrictId],
CrimeTypeId: INT [FK to CrimeType.CrimeTypeId],
PremiseId: INT [FK to Premise.PremiseId],
WeaponId: INT [FK to Weapon.WeaponId],
VictimId: INT [FK to Victim.VictimId]
)

## Functional Dependencies

PoliceStation Table

StationId→Division, Location, Latitude, Longitude

District Table

DistrictId→Name, Bureau, StationId

CrimeType Table

CrimeTypeId→CrimeTypeDesc, Part

Weapon Table

WeaponId→WeaponDesc

Premise Table

PremiseId→PremiseDesc

Victim Table

VictimId→Age, Sex, Descent

Record Table

RecordId→DateRptd, DateOcc, TimeOcc, Location, Latitude, Longitude, DistrictId, CrimeTypeId, PremiseId, WeaponId, VictimId

## BCNF

For the PoliceStation table, the primary key StationId functionally determines all other attributes. This is already in BCNF.

For the District table, the primary key DistrictId functionally determines all other attributes. This is already in BCNF.

The CrimeType, Weapon, Premise, and Victim tables have primary keys that functionally determine all other attributes in their respective tables, placing them in BCNF.

The Record table's primary key RecordId determines all other attributes. Thus, this table is also in BCNF.
