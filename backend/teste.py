import pyodbc

try:
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 18 for SQL Server};'
        'SERVER=Junior;'  # Use o nome correto do servidor, se necessário
        'DATABASE=GerenciadorEstoque;'
        'Trusted_Connection=yes;'
        'Encrypt=no;'  # Desabilita a criptografia SSL
    )
    print("Conexão com o banco de dados bem-sucedida!")
    conn.close()
except Exception as e:
    print(f"Erro na conexão com o banco de dados: {e}")
