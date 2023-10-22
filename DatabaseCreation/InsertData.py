import mysql.connector
import pandas as pd

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
file = "LAPD_Reporting_District.csv"
data = pd.read_csv(file)
for i in range(len(data)):
    row = data.iloc[i]
    DistrictId = row["NAME"]
    Name = row["NAME"]
    Bureau = row["BUREAU"]
    StationId = row["PREC"]
    cursor.execute(f"""
        INSERT INTO District
        VALUES ({DistrictId}, {Name}, '{Bureau}', {StationId});
    """)
db.commit()

# Finally, close the connection
if db.is_connected():
    cursor.close()
    db.close()
    print("Connection closed")
