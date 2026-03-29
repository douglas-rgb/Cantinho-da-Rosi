
// import payment from "../config/mp.js";
// import Pagamento from "../models/Pagamento.js";

// export const criarPagamento = async (req, res) => {
//   try {
//     const { valor, produto, email, nome, sobrenome, cpf } = req.body;

//     const response = await payment.create({
//       body: {
//         transaction_amount: Number(valor),
//         description: produto,
//         payment_method_id: "pix",
//         payer: {
//           email,
//           first_name: nome,
//           last_name: sobrenome,
//           identification: { type: "CPF", number: cpf },
//         },
//       },
//     });

//     // CRIAÇÃO: Usando idPagamentoMP
//     await Pagamento.create({
//       idPagamentoMP: String(response.id),
//       valor: Number(valor),
//       status: "pending",
//       emailPagador: email,
//       produto: produto
//     });

//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const receberWebhook = async (req, res) => {
//   try {
//     // Pega o ID de qualquer formato que o Mercado Pago enviar
//     const paymentId = req.body.data?.id || req.body.id;

//     if (paymentId) {
//       console.log(`🔔 Notificação recebida para o ID: ${paymentId}`);

//       const paymentInfo = await payment.get({ id: String(paymentId) });
//       const p = paymentInfo.payer || {};
//       const nomeCompleto = `${p.first_name || ""} ${p.last_name || ""}`.trim();

//       // ATUALIZAÇÃO: Busca por idPagamentoMP e muda o status
//       const atualizado = await Pagamento.findOneAndUpdate(
//         { idPagamentoMP: String(paymentId) },
//         { 
//           status: paymentInfo.status,
//           nomePagador: nomeCompleto || "Nome não disponível",
//           updatedAt: new Date()
//         },
//         { new: true }
//       );

//       if (atualizado) {
//         console.log(`✅ Pagamento ${paymentId} atualizado para: ${paymentInfo.status}`);
//       } else {
//         console.log(`⚠️ Pagamento ${paymentId} não encontrado no banco para atualizar.`);
//       }
//     }

//     res.status(200).send("OK");
//   } catch (err) {
//     console.error("❌ Erro no Webhook:", err.message);
//     res.status(200).send("OK"); 
//   }
// };

// export const listarPagamentos = async (req, res) => {
//   try {
//     const pagamentos = await Pagamento.find().sort({ createdAt: -1 });
//     res.json(pagamentos);
//   } catch (err) {
//     console.error("❌ Erro ao buscar pagamentos:", err.message);
//     res.status(500).json({ error: "Erro ao buscar pagamentos" });
//   }
// };

import payment from "../config/mp.js";
import Pagamento from "../models/Pagamento.js";

// ==============================
// CRIAR PAGAMENTO (PIX)
// ==============================
export const criarPagamento = async (req, res) => {
  try {
    const { valor, produto, email, nome, sobrenome, cpf } = req.body;

    if (!valor || !produto || !email || !nome || !cpf) {
      return res.status(400).json({ error: "Dados obrigatórios faltando" });
    }

    // Limpa o CPF (apenas números) para evitar erro 400 no MP
    const cpfLimpo = cpf.replace(/\D/g, "");

    const response = await payment.create({
      body: {
        transaction_amount: Number(valor),
        description: produto,
        payment_method_id: "pix",
        payer: {
          email,
          first_name: nome,
          last_name: sobrenome || "",
          identification: {
            type: "CPF",
            number: cpfLimpo,
          },
        },
      },
    });

    // No SDK V2, os dados retornam dentro de .body
    const p = response.body || response;

    await Pagamento.create({
      idPagamentoMP: String(p.id),
      valor: Number(valor),
      status: p.status || "pending",
      emailPagador: email,
      nomePagador: `${nome} ${sobrenome || ""}`.trim(),
      cpfPagador: cpfLimpo,
      bancoPagador: null,
    });

    return res.json(p);
  } catch (error) {
    console.error("❌ Erro ao criar pagamento:", error.message);
    // Log detalhado do erro da API do Mercado Pago se disponível
    if (error.cause) console.error("Causa:", error.cause); 
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

// ==============================
// WEBHOOK (ATUALIZA PAGAMENTO)
// ==============================
export const receberWebhook = async (req, res) => {
  try {
    // O MP envia o ID de formas diferentes dependendo do evento
    const paymentId = req.body.data?.id || req.body.id;
    const action = req.body.action || req.body.type;

    // Só processa se for um evento de pagamento
    if (!paymentId || (action && !action.includes("payment"))) {
      return res.status(200).send("OK");
    }

    console.log(`🔔 Webhook recebido para ID: ${paymentId}`);

    // Busca os dados atualizados no Mercado Pago
    const response = await payment.get({ id: String(paymentId) });
    const data = response.body || response;

    // Mapeamento seguro dos dados do pagador
    const payer = data.payer || {};
    const nomeCompleto = [payer.first_name, payer.last_name]
      .filter(Boolean)
      .join(" ") || "Nome não disponível";

    const cpf = payer.identification?.number || "CPF não informado";

    // Extração do banco (Pix)
    const banco =
      data.point_of_interaction?.transaction_data?.bank_info?.name ||
      data.point_of_interaction?.transaction_data?.financial_institution ||
      "Banco não identificado";

    // Atualiza no seu banco de dados
    const atualizado = await Pagamento.findOneAndUpdate(
      { idPagamentoMP: String(paymentId) },
      {
        status: data.status,
        nomePagador: nomeCompleto,
        cpfPagador: cpf,
        bancoPagador: banco,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (atualizado) {
      console.log(`✅ Status [${data.status}] atualizado para o pagamento ${paymentId}`);
    } else {
      console.log(`⚠️ Pagamento ${paymentId} não encontrado no seu banco.`);
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Erro no processamento do webhook:", err.message);
    // Retornamos 200 para o MP não ficar reenviando o mesmo erro em loop
    return res.status(200).send("OK");
  }
};

// ==============================
// LISTAR PAGAMENTOS
// ==============================
export const listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find().sort({ createdAt: -1 });
    return res.json(pagamentos);
  } catch (err) {
    console.error("❌ Erro ao listar pagamentos:", err.message);
    return res.status(500).json({ error: "Erro ao buscar pagamentos" });
  }
};