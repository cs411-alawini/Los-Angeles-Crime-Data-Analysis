import mysql.connector
import pandas as pd
from datetime import datetime
import math

# try to connect to the GCP database Los_Angeles_Crime_Data
try:
    db = mysql.connector.connect(
        host="34.16.119.202",
        user="root",
        password="CS411Team37",
        database="Los_Angeles_Crime_Data"
    )
    cursor = db.cursor()
    print("Connected to database Los_Angeles_Crime_Data")
except mysql.connector.Error as e:
    print(f"Error: {e}")

# insert one user, because any record needs to be created by a user
cursor.execute(f"""
    INSERT INTO User
    VALUES ('Admin', 'CS411Team37');
""")

# insert data to the table PoliceStation
file = "LAPD_Police_Stations.csv"
data = pd.read_csv(file)
for i in range(len(data)):
    row = data.iloc[i]
    StationId = row["PREC"]
    Division = row["DIVISION"]
    Location = row["LOCATION"]
    Latitude = round(row["Y"], 4)
    Longitude = round(row["X"], 4)
    cursor.execute(f"""
        INSERT INTO PoliceStation
        VALUES ({StationId}, '{Division}', '{Location}', {Latitude}, {Longitude});
    """)
db.commit()

# insert data to the table District
DistrictIds = set()
file = "LAPD_Reporting_District.csv"
data = pd.read_csv(file)
for i in range(len(data)):
    row = data.iloc[i]
    DistrictId = row["NAME"]
    DistrictIds.add(DistrictId)
    Name = row["NAME"]
    Bureau = row["BUREAU"]
    StationId = row["PREC"]
    cursor.execute(f"""
        INSERT INTO District
        VALUES ({DistrictId}, {Name}, '{Bureau}', {StationId});
    """)
db.commit()

# extract data from the big csv and insert data to the rest tables
file = "Crime_Data_from_2020_to_Present.csv"
data = pd.read_csv(file)
Crm_cds = set()
Premis_Cds = set()
Weapon_used_Cds = set()
VictimCount = 0
print("processing the big csv:")
for i in range(len(data)):
    if i % 1000 == 0:
        print(f"    At row {i}")
    row = data.iloc[i]

    CrimeTypeId = row["Crm Cd"]
    CrimeTypeDesc = row["Crm Cd Desc"]
    Part = row["Part 1-2"]
    if not math.isnan(CrimeTypeId) and CrimeTypeId not in Crm_cds:
        Crm_cds.add(CrimeTypeId)
        cursor.execute(f"""
            INSERT INTO CrimeType
            VALUES ({CrimeTypeId}, '{CrimeTypeDesc}', '{str(Part)[0]}');
        """)
    elif math.isnan(CrimeTypeId):
        CrimeTypeId = 'NULL'

    PremiseId = row["Premis Cd"]
    if not math.isnan(PremiseId):
        PremiseId = int(PremiseId)
    PremiseDesc = str(row["Premis Desc"]).replace("'", '"')
    if not math.isnan(PremiseId) and PremiseId not in Premis_Cds:
        Premis_Cds.add(PremiseId)
        cursor.execute(f"""
            INSERT INTO Premise
            VALUES ({PremiseId}, '{PremiseDesc}');
        """)
    elif math.isnan(PremiseId):
        PremiseId = 'NULL'

    WeaponId = row["Weapon Used Cd"]
    WeaponDesc = row["Weapon Desc"]
    if not math.isnan(WeaponId) and WeaponId not in Weapon_used_Cds:
        Weapon_used_Cds.add(WeaponId)
        cursor.execute(f"""
            INSERT INTO Weapon
            VALUES ({WeaponId}, '{WeaponDesc}');
        """)
    elif math.isnan(WeaponId):
        WeaponId = 'NULL'

    VictimId = 'NULL'
    VictimAge = row["Vict Age"]
    VictimSex = row["Vict Sex"]
    VictimDescent = row["Vict Descent"]
    if not math.isnan(VictimAge) and VictimAge > 0:
        VictimCount += 1
        VictimId = VictimCount
        cursor.execute(f"""
            INSERT INTO Victim
            VALUES ({VictimId}, {VictimAge}, '{str(VictimSex)[0]}', '{str(VictimDescent)[0]}');
        """)

    RecordId = row["DR_NO"]
    DateRptd = row["Date Rptd"]
    DateRptd = datetime.strptime(DateRptd, "%m/%d/%Y %I:%M:%S %p")
    DateRptd = DateRptd.strftime("%Y-%m-%d")
    DateOcc = row["DATE OCC"]
    DateOcc = datetime.strptime(DateOcc, "%m/%d/%Y %I:%M:%S %p")
    DateOcc = DateOcc.strftime("%Y-%m-%d")
    TimeOcc = row["TIME OCC"]
    TimeOcc = f"{TimeOcc // 100}:{TimeOcc % 100}:00"
    Location = row["LOCATION"]
    Latitude = round(row["LAT"], 4)
    Longitude = round(row["LON"], 4)
    DistrictId = row["Rpt Dist No"]
    if DistrictId not in DistrictIds:
        continue
    cursor.execute(f"""
        INSERT INTO Record
        VALUES (
            {RecordId}, '{DateRptd}','{DateOcc}', '{TimeOcc}', '{Location}', {Latitude}, {Longitude}, 
            {DistrictId}, {CrimeTypeId}, {PremiseId}, {WeaponId}, {VictimId}, "Admin"
        );
    """)

db.commit()

# Finally, close the connection
if db.is_connected():
    cursor.close()
    db.close()
    print("Connection closed")
