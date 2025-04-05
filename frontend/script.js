document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productQuantity = parseInt(document.getElementById("productQuantity").value);
    const productPrice = parseFloat(document.getElementById("productPrice").value);

    const productData = {
        nome: productName,
        descricao: productDescription,
        quantidade: productQuantity,
        preco: productPrice
    };

    fetch("http://127.0.0.1:5000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById("message");
        if (data.message) {
            messageDiv.textContent = data.message;
            messageDiv.style.color = "green";
        } else {
            messageDiv.textContent = data.error;
            messageDiv.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        const messageDiv = document.getElementById("message");
        messageDiv.textContent = "Erro ao se conectar ao servidor!";
        messageDiv.style.color = "red";
    });

    // Limpar os campos após o envio
    document.getElementById("product-form").reset();
});

function carregarProdutos() {
    fetch("http://127.0.0.1:5000/produtos")
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector("#tabela-produtos tbody");
            tabela.innerHTML = ""; // limpa a tabela

            if (Array.isArray(data)) {
                data.forEach(produto => {
                    const row = `
                        <tr>
                            <td>${produto.nome}</td>
                            <td>${produto.descricao}</td>
                            <td>${produto.quantidade}</td>
                            <td>R$ ${produto.preco.toFixed(2)}</td>
                        </tr>
                    `;
                    tabela.innerHTML += row;
                });
            } else {
                console.error("Erro ao carregar produtos:", data.error);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar produtos:", error);
        });
}

document.getElementById("mostrarTabelaBtn").addEventListener("click", function () {
    document.getElementById("tabelaCard").classList.remove("d-none");
    carregarProdutos();
});

document.getElementById("fecharTabelaBtn").addEventListener("click", function () {
    document.getElementById("tabelaCard").classList.add("d-none");
});
