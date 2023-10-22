import mysql.connector

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

# want to build the database from scratch, so first remove all tables
cursor.execute("SHOW TABLES")
tables = cursor.fetchall()
# without this line, can't drop a referenced table
cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
for table in tables:
    table_name = table[0]
    cursor.execute(f"DROP TABLE {table_name}")
cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
if tables:
    print("Existing tables dropped")
else:
    print("No existing table")

# create tables as in the UML diagram
cursor.execute("""
    CREATE TABLE PoliceStation (
        StationId INT PRIMARY KEY,
        Division VARCHAR(50),
        Location VARCHAR(50),
        Latitude DECIMAL(7, 4),
        Longitude DECIMAL(7, 4)
    );
""")

cursor.execute("""
    CREATE TABLE District (
        DistrictId INT PRIMARY KEY,
        Name VARCHAR(50),
        Bureau VARCHAR(50),
        StationId INT,
        FOREIGN KEY (StationId) REFERENCES PoliceStation(StationId)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );
""")

cursor.execute("""
    CREATE TABLE CrimeType (
        CrimeTypeId INT PRIMARY KEY,
        CrimeTypeDesc VARCHAR(50),
        Part CHAR(1)
    );
""")

cursor.execute("""
    CREATE TABLE Premise (
        PremiseId INT PRIMARY KEY,
        PremiseDesc VARCHAR(50)
    );
""")

cursor.execute("""
    CREATE TABLE Weapon (
        WeaponId INT PRIMARY KEY,
        WeaponDesc VARCHAR(50)
    );
""")

cursor.execute("""
    CREATE TABLE Victim (
        VictimId INT PRIMARY KEY,
        Age INT,
        Sex CHAR(1),
        Descent CHAR(1)
    );
""")

cursor.execute("""
    CREATE TABLE User (
        UserName VARCHAR(50) PRIMARY KEY,
        Password VARCHAR(50)
    );
""")

cursor.execute("""
    CREATE TABLE Record (
        RecordId INT PRIMARY KEY,
        DateRptd DATE,
        DateOcc DATE,
        TimeOcc TIME,
        Location VARCHAR(50),
        Latitude DECIMAL(7, 4),
        Longitude DECIMAL(7, 4),
        DistrictId INT,
        FOREIGN KEY (DistrictId) REFERENCES District(DistrictId)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        CrimeTypeId INT,
        FOREIGN KEY (CrimeTypeId) REFERENCES CrimeType(CrimeTypeId)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        PremiseId INT,
        FOREIGN KEY (PremiseId) REFERENCES Premise(PremiseId)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        WeaponId INT,
        FOREIGN KEY (WeaponId) REFERENCES Weapon(WeaponId)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        UserName VARCHAR(50),
        FOREIGN KEY (UserName) REFERENCES User(UserName)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );
""")

print("Tables created")

# Finally, close the connection
if db.is_connected():
    cursor.close()
    db.close()
    print("Connection closed")
