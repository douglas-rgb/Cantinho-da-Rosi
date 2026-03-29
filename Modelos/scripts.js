document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-comprar").forEach((botao) => {
    botao.addEventListener("click", () => {
      const produto = botao.getAttribute("data-produto");
      const precoPadrao = Number(botao.getAttribute("data-preco"));
      
      // Abre o formulário onde o cliente pode editar o valor
      abrirFormularioDados(produto, precoPadrao);
    });
  });

  // MENU MOBILE
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("active"));
  }
});

// FUNÇÃO 1: Abre o formulário para preencher Nome, CPF e Editar Valor
function abrirFormularioDados(produto, preco) {
  const divForm = document.createElement("div");
  divForm.id = "modal-dados-cliente";
  divForm.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:9999; padding:20px;">
      <div style="background:#fff; padding:25px; border-radius:15px; text-align:center; max-width:380px; width:100%; font-family: sans-serif;">
        <h2 style="margin-bottom:10px; color:#333;">Finalizar Compra</h2>
        <p style="color:#666; margin-bottom:5px;">Produto: <b>${produto}</b></p>
        
        <div style="text-align:left; margin-bottom:15px;">
          <label style="font-size:12px; color:#999; display:block; margin-bottom:5px;">Confirme ou altere o valor (R$):</label>
          <input type="number" id="cust-valor" value="${preco.toFixed(2)}" step="0.01" min="1.00" style="width:100%; padding:12px; border:1px solid #6a0dad; border-radius:8px; font-weight:bold; color:#6a0dad; font-size:18px;">
        </div>

        <input type="text" id="cust-nome" placeholder="Seu Nome Completo" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid #ccc; border-radius:8px;">
        <input type="text" id="cust-cpf" placeholder="Seu CPF (apenas números)" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #ccc; border-radius:8px;">
        
        <button id="btn-gerar-pix" style="width:100%; padding:15px; background:#6a0dad; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold; font-size:16px;">
          GERAR PAGAMENTO PIX
        </button>
        
        <button onclick="document.getElementById('modal-dados-cliente').remove()" style="margin-top:15px; background:none; border:none; color:#999; cursor:pointer;">Cancelar</button>
      </div>
    </div>
  `;
  document.body.appendChild(divForm);

  document.getElementById("btn-gerar-pix").addEventListener("click", async () => {
    const nome = document.getElementById("cust-nome").value;
    const cpf = document.getElementById("cust-cpf").value.replace(/\D/g, "");
    const valorEditado = Number(document.getElementById("cust-valor").value);

    // Validações básicas
    if (!nome || cpf.length < 11) {
      alert("Por favor, preencha o nome e um CPF válido.");
      return;
    }
    if (valorEditado < 1) {
      alert("O valor mínimo para o PIX é R$ 1,00.");
      return;
    }

    const btn = document.getElementById("btn-gerar-pix");
    btn.innerText = "Processando...";
    btn.disabled = true;

    try {
      const response = await fetch("https://backend-croche.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valor: valorEditado, // Agora envia o valor que está no input
          produto: produto,
          email: "cliente@email.com",
          nome: nome,
          cpf: cpf
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        document.getElementById("modal-dados-cliente").remove();
        mostrarPix(data);
      } else {
        alert("Erro: " + (data.error || "Verifique os dados e tente novamente"));
        btn.innerText = "GERAR PAGAMENTO PIX";
        btn.disabled = false;
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
      btn.disabled = false;
    }
  });
}

// FUNÇÃO 2: Mostra o QR Code gerado
function mostrarPix(data) {
  const pix = data.point_of_interaction.transaction_data;
  const div = document.createElement("div");
  div.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:9999; padding:20px;">
      <div style="background:#fff; padding:20px; border-radius:12px; text-align:center; max-width:350px; width:100%;">
        <h2 style="margin-bottom:10px;">Pague com PIX</h2>
        <img src="data:image/png;base64,${pix.qr_code_base64}" style="width:100%; max-width:200px; margin:auto;">
        <p style="margin-top:10px; font-size:14px;">Copie o código abaixo:</p>
        <textarea readonly style="width:100%; height:80px; margin-top:5px; padding:8px; border-radius:8px; border:1px solid #ddd; background:#f9f9f9; font-size:12px; resize:none;">${pix.qr_code}</textarea>
        <button style="margin-top:10px; padding:10px; width:100%; border:none; background:#6a0dad; color:#fff; border-radius:8px; cursor:pointer; font-weight:bold;" onclick="this.closest('div').parentElement.remove()">Fechar</button>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}