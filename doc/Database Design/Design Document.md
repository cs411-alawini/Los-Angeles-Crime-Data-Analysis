## UML Diagram

<img src="C:\Users\96103\AppData\Roaming\Typora\typora-user-images\image-20230930105100430.png" alt="image-20230930105100430" style="zoom: 67%;" />

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
+ reported in: Each crime Record is reported in exactly 1 District, while each District may get involved in any number of Records.
+ provided by: Each crime Record is provided by exactly 1 User, while each User may provide any number of Records.
+ use: Each crime Record uses at most 1 Weapon, while each Weapon is used in any number of crime Records.
+ occur in: Each crime Record occurs in at most 1 Premise, while each Premise may get involved in any number of crime Records.
+ crime type: Each crime Record includes at most 1 CrimeType, while each CrimeType may happen in any number of crime Records.