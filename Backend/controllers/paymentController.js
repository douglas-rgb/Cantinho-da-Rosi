
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
            number: cpf,
          },
        },
      },
    });

    await Pagamento.create({
      idPagamentoMP: String(response.id),
      valor: Number(valor),
      status: "pending",
      emailPagador: email,
      nomePagador: `${nome} ${sobrenome || ""}`.trim(),
      cpfPagador: cpf,
      bancoPagador: null, // será atualizado depois
    });

    return res.json(response);
  } catch (error) {
    console.error("❌ Erro ao criar pagamento:", error.message);
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

// ==============================
// WEBHOOK (ATUALIZA PAGAMENTO)
// ==============================
export const receberWebhook = async (req, res) => {
  try {
    const paymentId = req.body?.data?.id || req.body?.id;

    if (!paymentId) {
      return res.status(200).send("OK");
    }

    console.log(`🔔 Webhook recebido: ${paymentId}`);

    const paymentInfo = await payment.get({ id: String(paymentId) });

    // ==============================
    // DADOS DO PAGADOR (SEGURO)
    // ==============================
    const payer = paymentInfo?.payer || {};

    const nomeCompleto = [
      payer.first_name || "",
      payer.last_name || "",
    ].join(" ").trim() || "Nome não disponível";

    const cpf = payer?.identification?.number || "CPF não informado";

    // ==============================
    // BANCO (COM FALLBACKS)
    // ==============================
    const banco =
      paymentInfo?.point_of_interaction?.transaction_data?.bank_info?.name ||
      paymentInfo?.point_of_interaction?.transaction_data?.financial_institution ||
      "Banco não identificado";

    // ==============================
    // ATUALIZA NO BANCO
    // ==============================
    const atualizado = await Pagamento.findOneAndUpdate(
      { idPagamentoMP: String(paymentId) },
      {
        status: paymentInfo.status || "desconhecido",
        nomePagador: nomeCompleto,
        cpfPagador: cpf,
        bancoPagador: banco,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!atualizado) {
      console.log(`⚠️ Pagamento não encontrado: ${paymentId}`);
    } else {
      console.log(`✅ Atualizado com sucesso`);
      console.log(`👤 Nome: ${nomeCompleto}`);
      console.log(`🧾 CPF: ${cpf}`);
      console.log(`🏦 Banco: ${banco}`);
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Erro no webhook:", err.message);
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