document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".btn-comprar").forEach((botao) => {
    botao.addEventListener("click", async () => {

      const produto = botao.getAttribute("data-produto");
      const preco = Number(botao.getAttribute("data-preco"));

      console.log("🛒 Produto:", produto);

      try {
        const response = await fetch("http://localhost:3000/api/pagamento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valor: preco,
            produto: produto,
            email: "cliente@email.com"
          }),
        });

        const data = await response.json();
        console.log("RESPOSTA:", data);

        mostrarPix(data);

      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao gerar pagamento");
      }

    });
  });

  // MENU
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

});

function mostrarPix(data) {
  const pix = data.point_of_interaction.transaction_data;

  const div = document.createElement("div");

  div.innerHTML = `
    <div style="
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.85);
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:9999;
      padding:20px;
    ">
      <div style="
        background:#fff;
        padding:20px;
        border-radius:12px;
        text-align:center;
        max-width:350px;
        width:100%;
      ">
        <h2 style="margin-bottom:10px;">Pague com PIX</h2>

        <img 
          src="data:image/png;base64,${pix.qr_code_base64}" 
          style="width:100%; max-width:200px; margin:auto;"
        >

        <p style="margin-top:10px;">Copie o código:</p>

        <textarea 
          style="
            width:100%;
            height:80px;
            margin-top:5px;
            padding:8px;
            border-radius:8px;
          "
        >${pix.qr_code}</textarea>

        <button 
          style="
            margin-top:10px;
            padding:10px;
            width:100%;
            border:none;
            background:#6a0dad;
            color:#fff;
            border-radius:8px;
            cursor:pointer;
          "
          onclick="this.closest('div').parentElement.remove()"
        >
          Fechar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(div);
}