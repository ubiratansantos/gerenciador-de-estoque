import pyodbc

def get_db_connection():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 18 for SQL Server};'
        'SERVER=Junior;'  # Use o nome correto do servidor, se necessário
        'DATABASE=GerenciadorEstoque;'
        'Trusted_Connection=yes;'
        'Encrypt=no;'  # Desabilita a criptografia SSL
    )
    return conn


