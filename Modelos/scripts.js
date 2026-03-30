// document.addEventListener("DOMContentLoaded", () => {
//     const NUMERO_WHATSAPP = "5511915371799";
//     // IMPORTANTE: Deixe a URL assim, sem a barra no final
//     const URL_BASE = "https://backend-croche.onrender.com";

//     // 1. WHATSAPP: Botões de Encomenda
//     document.querySelectorAll(".btn-encomendar").forEach((botao) => {
//         botao.addEventListener("click", () => {
//             const produto = botao.getAttribute("data-produto");
//             const texto = encodeURIComponent(`Olá Rosi! Vi o modelo *${produto}* no seu site e gostaria de pedir um orçamento.`);
//            window.open(`https://wa.me{NUMERO_WHATSAPP}?text=${textoFinal}`, "_blank");
//         });
//     });

//     // 2. PAGAMENTO: Botão do Header "Pagar Encomenda"
//     const btnPagamentoHeader = document.getElementById("abrir-pagamento");
//     if (btnPagamentoHeader) {
//         btnPagamentoHeader.addEventListener("click", (e) => {
//             e.preventDefault();
//             abrirFormularioPagamento("Encomenda Personalizada", 1.00);
//         });
//     }

//     // 3. WHATSAPP: Formulário de Contato
//     const formContato = document.getElementById("form-contato");
//     if (formContato) {
//         formContato.addEventListener("submit", (e) => {
//             e.preventDefault();
//             const nome = document.getElementById("nome-contato").value;
//             const produto = document.getElementById("servico-contato").value;
//             const mensagem = document.getElementById("mensagem-contato").value;
//             const textoFinal = encodeURIComponent(`Olá Rosi, meu nome é ${nome}. Estou interessado(a) em: *${produto}*.\n\n${mensagem}`);
//             window.open(`https://wa.me{NUMERO_WHATSAPP}?text=${textoFinal}`, "_blank");
//         });
//     }

//     // 4. MENU MOBILE
//     const toggle = document.getElementById("menu-toggle");
//     const nav = document.getElementById("nav");
//     if (toggle && nav) {
//         toggle.addEventListener("click", () => nav.classList.toggle("active"));
//     }

//     // ==========================================
//     // FUNÇÕES DE PAGAMENTO (MERCADO PAGO)
//     // ==========================================

//     function abrirFormularioPagamento(produto, precoSugerido) {
//         const modal = document.createElement("div");
//         modal.id = "modal-pagamento-pix";
//         modal.innerHTML = `
//             <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:10000; padding:20px;">
//                 <div style="background:#1a1a2e; padding:30px; border-radius:20px; border:1px solid #a855f7; text-align:center; max-width:400px; width:100%; color:#fff; font-family: sans-serif;">
//                     <h3 style="color:#a855f7; margin-bottom:15px;">Pagar Encomenda</h3>
                    
//                     <label style="display:block; text-align:left; font-size:12px; color:#94a3b8;">Valor combinado (R$):</label>
//                     <input type="number" id="pay-valor" value="${precoSugerido.toFixed(2)}" step="0.01" style="width:100%; padding:12px; margin-bottom:15px; border-radius:8px; border:1px solid #2d2d4a; background:#0f0f1a; color:#fff; font-size:18px; font-weight:bold;">

//                     <input type="text" id="pay-nome" placeholder="Seu Nome Completo" style="width:100%; padding:12px; margin-bottom:10px; border-radius:8px; border:1px solid #2d2d4a; background:#0f0f1a; color:#fff;">
//                     <input type="text" id="pay-cpf" placeholder="Seu CPF (apenas números)" style="width:100%; padding:12px; margin-bottom:20px; border-radius:8px; border:1px solid #2d2d4a; background:#0f0f1a; color:#fff;">

//                     <button id="btn-confirmar-pagamento" style="width:100%; padding:15px; background:#a855f7; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">GERAR PIX AGORA</button>
//                     <button onclick="document.getElementById('modal-pagamento-pix').remove()" style="margin-top:15px; background:none; border:none; color:#94a3b8; cursor:pointer;">Cancelar</button>
//                 </div>
//             </div>
//         `;
//         document.body.appendChild(modal);

//         document.getElementById("btn-confirmar-pagamento").addEventListener("click", async () => {
//             const valor = document.getElementById("pay-valor").value;
//             const nome = document.getElementById("pay-nome").value;
//             const cpf = document.getElementById("pay-cpf").value.replace(/\D/g, "");

//             if (!nome || cpf.length < 11 || valor < 1) {
//                 alert("Preencha todos os dados corretamente. Valor mínimo R$ 1,00.");
//                 return;
//             }

//             const btn = document.getElementById("btn-confirmar-pagamento");
//             btn.innerText = "Processando...";
//             btn.disabled = true;

//             try {
//                 // /api/pagamento
//                 const res = await fetch(`${URL_BASE}/api/pagamento`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ 
//                         valor: Number(valor), 
//                         produto: produto, 
//                         nome: nome, 
//                         cpf: cpf, 
//                         email: "cliente@email.com" 
//                     })
//                 });

//                 const data = await res.json();
                
//                 if (res.ok && data.point_of_interaction) {
//                     modal.remove();
//                     exibirResultadoPix(data);
//                 } else {
//                     console.error("Erro na API:", data);
//                     alert("Erro: " + (data.error || "Verifique os dados e tente novamente"));
//                     btn.innerText = "GERAR PIX AGORA";
//                     btn.disabled = false;
//                 }
//             } catch (err) {
//                 console.error("Erro no fetch:", err);
//                 alert("Erro ao conectar com o servidor. Verifique sua internet ou tente novamente.");
//                 btn.innerText = "GERAR PIX AGORA";
//                 btn.disabled = false;
//             }
//         });
//     }

//     function exibirResultadoPix(data) {
//         const pix = data.point_of_interaction.transaction_data;
//         const div = document.createElement("div");
//         div.innerHTML = `
//             <div id="pix-sucesso" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); display:flex; justify-content:center; align-items:center; z-index:10001; padding:20px;">
//                 <div style="background:#fff; padding:25px; border-radius:15px; text-align:center; max-width:350px; width:100%; color:#333; font-family: sans-serif;">
//                     <h2 style="margin-bottom:15px;">Pix Gerado com Sucesso!</h2>
//                     <img src="data:image/png;base64,${pix.qr_code_base64}" style="width:100%; max-width:200px; margin:auto; display:block;">
//                     <p style="margin-top:15px; font-size:14px; color:#666;">Código Pix Copia e Cola:</p>
//                     <textarea readonly style="width:100%; height:80px; margin-top:5px; padding:10px; border-radius:8px; border:1px solid #ddd; background:#f5f5f5; font-size:12px; resize:none;">${pix.qr_code}</textarea>
//                     <button style="margin-top:15px; padding:12px; width:100%; border:none; background:#a855f7; color:#fff; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="document.getElementById('pix-sucesso').remove()">Fechar</button>
//                 </div>
//             </div>
//         `;
//         document.body.appendChild(div);
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const NUMERO_WHATSAPP = "5511915371799";
    // IMPORTANTE: URL do seu backend no Render
    const URL_BASE = "https://backend-croche.onrender.com";

    // --- 1. WHATSAPP: Botões de Encomenda nos Cards ---
    document.querySelectorAll(".btn-encomendar").forEach((botao) => {
        botao.addEventListener("click", () => {
            const produto = botao.getAttribute("data-produto") || "modelo de crochê";
            const texto = `Olá Rosi! Vi o modelo *${produto}* no seu site e gostaria de pedir um orçamento.%0ARetornaremos em breve`;

            // 2. O encodeURIComponent transforma a quebra de linha real em %0A
            const textoCodificado = encodeURIComponent(texto);
            
            // Correção da URL: adicionada a "/" e encodeURIComponent
            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
            window.open(url, "_blank");
        });
    });

    // --- 2. PAGAMENTO: Botão do Header "Pagar Encomenda" ---
    const btnPagamentoHeader = document.getElementById("abrir-pagamento");
    if (btnPagamentoHeader) {
        btnPagamentoHeader.addEventListener("click", (e) => {
            e.preventDefault();
            abrirFormularioPagamento("Encomenda Personalizada", 1.00);
        });
    }

    // --- 3. WHATSAPP: Formulário de Contato ---
    const formContato = document.getElementById("form-contato");
    if (formContato) {
        formContato.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome-contato").value;
            const produto = document.getElementById("servico-contato").value;
            const mensagem = document.getElementById("mensagem-contato").value;
            
            const textoFinal = `Olá Rosi, meu nome é ${nome}. Estou interessado(a) em: *${produto}*.\n\n${mensagem}`;
            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoFinal)}`;
            window.open(url, "_blank");
        });
    }

    // --- 4. MENU MOBILE ---
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    if (toggle && nav) {
        toggle.addEventListener("click", () => nav.classList.toggle("active"));
    }

    // ==========================================
    // FUNÇÕES DE PAGAMENTO (MERCADO PAGO)
    // ==========================================

    function abrirFormularioPagamento(produto, precoSugerido) {
        const modal = document.createElement("div");
        modal.id = "modal-pagamento-pix";
        modal.innerHTML = `
            <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:10000; padding:20px;">
                <div style="background:#1a1a2e; padding:30px; border-radius:20px; border:1px solid #a855f7; text-align:center; max-width:400px; width:100%; color:#fff; font-family: sans-serif;">
                    <h3 style="color:#a855f7; margin-bottom:15px;">Pagar Encomenda</h3>
                    
                    <label style="display:block; text-align:left; font-size:12px; color:#94a3b8;">Valor combinado (R$):</label>
                    <input type="number" id="pay-valor" value="${precoSugerido.toFixed(2)}" step="0.01" style="width:100%; padding:12px; margin-bottom:15px; border-radius:8px; border:1px solid #2d2d4a; background:#0f0f1a; color:#fff; font-size:18px; font-weight:bold;">

                    <input type="text" id="pay-nome" placeholder="Seu Nome Completo" style="width:100%; padding:12px; margin-bottom:10px; border-radius:8px; border:1px solid #2d2d4a; background:#0f0f1a; color:#fff;">
                    <input type="text" id="pay-cpf" placeholder="Seu CPF (apenas números)" style="width:100%; padding:12px; margin-bottom:20px; border-radius:8px; border:1px solid #2d2d4a; background:#0f0f1a; color:#fff;">

                    <button id="btn-confirmar-pagamento" style="width:100%; padding:15px; background:#a855f7; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">GERAR PIX AGORA</button>
                    <button onclick="document.getElementById('modal-pagamento-pix').remove()" style="margin-top:15px; background:none; border:none; color:#94a3b8; cursor:pointer;">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById("btn-confirmar-pagamento").addEventListener("click", async () => {
            const valor = document.getElementById("pay-valor").value;
            const nome = document.getElementById("pay-nome").value;
            const cpf = document.getElementById("pay-cpf").value.replace(/\D/g, "");

            if (!nome || cpf.length < 11 || valor < 1) {
                alert("Preencha todos os dados corretamente. Valor mínimo R$ 1,00.");
                return;
            }

            const btn = document.getElementById("btn-confirmar-pagamento");
            btn.innerText = "Processando...";
            btn.disabled = true;

            try {
                // Chamada para o seu backend no Render
                const res = await fetch(`${URL_BASE}/api/pagamento`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        valor: Number(valor), 
                        produto: produto, 
                        nome: nome, 
                        cpf: cpf, 
                        email: "cliente@email.com" 
                    })
                });

                const data = await res.json();
                
                if (res.ok && data.point_of_interaction) {
                    modal.remove();
                    exibirResultadoPix(data);
                } else {
                    console.error("Erro na API:", data);
                    alert("Erro: " + (data.error || "Verifique os dados e tente novamente"));
                    btn.innerText = "GERAR PIX AGORA";
                    btn.disabled = false;
                }
            } catch (err) {
                console.error("Erro no fetch:", err);
                alert("Erro ao conectar com o servidor. Verifique se o backend no Render está ativo.");
                btn.innerText = "GERAR PIX AGORA";
                btn.disabled = false;
            }
        });
    }

    function exibirResultadoPix(data) {
        const pix = data.point_of_interaction.transaction_data;
        const div = document.createElement("div");
        div.innerHTML = `
            <div id="pix-sucesso" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); display:flex; justify-content:center; align-items:center; z-index:10001; padding:20px;">
                <div style="background:#fff; padding:25px; border-radius:15px; text-align:center; max-width:350px; width:100%; color:#333; font-family: sans-serif;">
                    <h2 style="margin-bottom:15px;">Pix Gerado com Sucesso!</h2>
                    <img src="data:image/png;base64,${pix.qr_code_base64}" style="width:100%; max-width:200px; margin:auto; display:block;">
                    <p style="margin-top:15px; font-size:14px; color:#666;">Código Pix Copia e Cola:</p>
                    <textarea readonly style="width:100%; height:80px; margin-top:5px; padding:10px; border-radius:8px; border:1px solid #ddd; background:#f5f5f5; font-size:12px; resize:none;">${pix.qr_code}</textarea>
                    <button style="margin-top:15px; padding:12px; width:100%; border:none; background:#a855f7; color:#fff; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="document.getElementById('pix-sucesso').remove()">Fechar</button>
                </div>
            </div>
        `;
        document.body.appendChild(div);
    }
});