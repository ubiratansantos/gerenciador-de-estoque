from flask import Flask, request, jsonify
from database import get_db_connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir requisições CORS do frontend

@app.route('/produtos', methods=['POST'])
def cadastrar_produto():
    try:
        data = request.get_json()
        
        nome = data['nome']
        descricao = data['descricao']
        quantidade = data['quantidade']
        preco = data['preco']

        # Conectar ao banco de dados
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO Produtos (nome, descricao, quantidade, preco)
            VALUES (?, ?, ?, ?)
        ''', (nome, descricao, quantidade, preco))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Produto cadastrado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
