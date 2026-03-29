
import payment from "../config/mp.js";
import Pagamento from "../models/Pagamento.js";

export const criarPagamento = async (req, res) => {
  try {
    const { valor, produto, email, nome, sobrenome, cpf } = req.body;

    const response = await payment.create({
      body: { 
        transaction_amount: Number(valor),
        description: produto,
        payment_method_id: "pix",
        payer: {
          email,
          first_name: nome,
          last_name: sobrenome,
          identification: { type: "CPF", number: cpf },
        },
      },
    });

    // CRIAÇÃO: Usando idPagamentoMP
    await Pagamento.create({
      idPagamentoMP: String(response.id),
      valor: Number(valor),
      status: "pending",
      emailPagador: email,
      produto: produto
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const receberWebhook = async (req, res) => {
  try {
    // Pega o ID de qualquer formato que o Mercado Pago enviar
    const paymentId = req.body.data?.id || req.body.id;

    if (paymentId) {
      console.log(`🔔 Notificação recebida para o ID: ${paymentId}`);

      const paymentInfo = await payment.get({ id: String(paymentId) });
      const p = paymentInfo.payer || {};
      const nomeCompleto = `${p.first_name || ""} ${p.last_name || ""}`.trim();

      // ATUALIZAÇÃO: Busca por idPagamentoMP e muda o status
      const atualizado = await Pagamento.findOneAndUpdate(
        { idPagamentoMP: String(paymentId) },
        { 
          status: paymentInfo.status,
          nomePagador: nomeCompleto || "Nome não disponível",
          updatedAt: new Date()
        },
        { new: true }
      );

      if (atualizado) {
        console.log(`✅ Pagamento ${paymentId} atualizado para: ${paymentInfo.status}`);
      } else {
        console.log(`⚠️ Pagamento ${paymentId} não encontrado no banco para atualizar.`);
      }
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Erro no Webhook:", err.message);
    res.status(200).send("OK"); 
  }
};

export const listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find().sort({ createdAt: -1 });
    res.json(pagamentos);
  } catch (err) {
    console.error("❌ Erro ao buscar pagamentos:", err.message);
    res.status(500).json({ error: "Erro ao buscar pagamentos" });
  }
};

