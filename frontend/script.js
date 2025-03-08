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
