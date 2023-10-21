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
if tables:
    print("Drop existing tables:")
else:
    print("No existing table")
for table in tables:
    table_name = table[0]
    cursor.execute(f"DROP TABLE {table_name}")
    print(f"    {table_name}")



# Finally, close the connection
if db.is_connected():
    cursor.close()
    db.close()
    print("Connection closed")
