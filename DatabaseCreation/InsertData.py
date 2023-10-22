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

file = "Crime_Data_from_2020_to_Present.csv"
# see what the data looks like
data = pd.read_csv(file)
first_row = data.iloc[0]
for key in first_row.keys():
    print(f"{key}: {first_row[key]} ({type(first_row[key])})")

# Finally, close the connection
if db.is_connected():
    cursor.close()
    db.close()
    print("Connection closed")
