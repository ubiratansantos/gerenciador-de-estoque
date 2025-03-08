import pyodbc


def get_db_connection():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=Junior;'
        'DATABASE=GerenciadorEstoque;'
        'Trusted_Connection=yes;'
    )
    return conn
