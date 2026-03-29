document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-comprar").forEach((botao) => {
    botao.addEventListener("click", async () => {
      const produto = botao.getAttribute("data-produto");
      const preco = Number(botao.getAttribute("data-preco"));

      // PEDIR DADOS OBRIGATÓRIOS (Para não dar erro 400 no backend)
      const nomeCliente = prompt("Digite seu nome completo:");
      const cpfCliente = prompt("Digite seu CPF (apenas números):");

      if (!nomeCliente || !cpfCliente) {
        alert("Nome e CPF são obrigatórios para gerar o PIX.");
        return;
      }

      console.log("🛒 Iniciando pagamento para:", produto);

      try {
        const response = await fetch(
          "https://backend-croche.onrender.com/api/pagamento",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              valor: preco,
              produto: produto,
              email: "cliente@email.com", // Você pode pedir o e-mail no prompt também
              nome: nomeCliente,
              cpf: cpfCliente.replace(/\D/g, ""), // Remove pontos e traços
            }),
          },
        );

        const data = await response.json();

        if (response.ok && data.point_of_interaction) {
          console.log("✅ Sucesso:", data);
          mostrarPix(data);
        } else {
          console.error("❌ Erro do Servidor:", data);
          alert(data.error || "Erro ao processar pagamento");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro de conexão com o servidor");
      }
    });
  });

  // MENU MOBILE
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});

function mostrarPix(data) {
  // Acessa os dados do Pix dentro da estrutura do Mercado Pago
  const pix = data.point_of_interaction.transaction_data;

  const div = document.createElement("div");
  div.id = "modal-pix-container";

  div.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:9999; padding:20px;">
      <div style="background:#fff; padding:20px; border-radius:12px; text-align:center; max-width:350px; width:100%; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
        <h2 style="margin-bottom:10px; color:#333;">Pague com PIX</h2>
        
        <img 
          src="data:image/png;base64,${pix.qr_code_base64}" 
          style="width:100%; max-width:200px; margin:10px auto; display:block;"
        >

        <p style="margin-top:10px; font-size:14px; color:#666;">Copie o código abaixo:</p>

        <textarea 
          readonly
          style="width:100%; height:80px; margin-top:5px; padding:8px; border-radius:8px; border:1px solid #ddd; font-size:12px; background:#f9f9f9; resize:none;"
        >${pix.qr_code}</textarea>

        <button 
          style="margin-top:15px; padding:12px; width:100%; border:none; background:#6a0dad; color:#fff; border-radius:8px; cursor:pointer; font-weight:bold;"
          onclick="document.getElementById('modal-pix-container').remove()"
        >
          Fechar Janela
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(div);
}
