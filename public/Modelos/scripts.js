document.addEventListener("DOMContentLoaded", () => {
    const NUMERO_WHATSAPP = "5511915371799";

    // 1. Lógica dos Botões de Encomenda nos Cards
    document.querySelectorAll(".btn-encomendar").forEach((botao) => {
        botao.addEventListener("click", () => {
            const produto = botao.getAttribute("data-produto");
            const texto = encodeURIComponent(
                `Olá Rosi! Vi o modelo *${produto}* no seu site e gostaria de pedir um orçamento. Você está aceitando encomendas dele?`
            );
            window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${texto}`, "_blank");
        });
    });

    // 2. Lógica do Formulário de Contato no Final da Página
    const formContato = document.getElementById("form-contato");
    if (formContato) {
        formContato.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome-contato").value;
            const produto = document.getElementById("servico-contato").value;
            const mensagem = document.getElementById("mensagem-contato").value;

            const textoFinal = encodeURIComponent(
                `Olá Rosi, meu nome é ${nome}.\nEstou interessado(a) em: *${produto}*.\n\n${mensagem}`
            );
            window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${textoFinal}`, "_blank");
        });
    }

    // 3. Menu Mobile
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});