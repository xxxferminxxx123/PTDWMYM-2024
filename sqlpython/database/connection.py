import pyodbc

def create_connection():
    connection = pyodbc.connect(
        'DRIVER={SQL Server};'
        'SERVER=DESKTOP-KNS3OQO;'
        'DATABASE=EmployeeDB;'
        'UID=;'
        'PWD=;'
    )
    return connection