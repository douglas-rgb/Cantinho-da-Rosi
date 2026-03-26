import payment from "../config/mp.js";
import Pagamento from "../models/pagamento.js"; // novo arquivo model, vamos criar depois

// Função existente: cria pagamento Pix
export const criarPagamento = async (req, res) => {
  try {
    const { valor, produto, email, nome, sobrenome, cpf } = req.body;

    const response = await payment.create({
      body: {
        transaction_amount: Number(valor),
        description: produto,
        payment_method_id: "pix",
        payer: {
          email: email, // e-mail do cliente
          first_name: nome, // nome do cliente
          last_name: sobrenome, // sobrenome do cliente
          identification: {
            type: "CPF",
            number: cpf // CPF do cliente (apenas números)
          },
        },
      },
    });

    res.json(response);
  } catch (error) {
    console.error("ERRO STATUS:", error);
    res.status(500).json({ error: error.message });
  }
};

// NOVO: Receber webhook do Mercado Pago (Pix pago)
export const receberWebhook = async (req, res) => {
  const data = req.body;

  try {
    // O Mercado Pago envia o ID da notificação
    // Precisamos buscar os detalhes da transação usando payment.findById
    const paymentInfo = await payment.get(data.id);

    // Extrair informações do pagador
    const payer = paymentInfo.body.payer || {};
    const nomePagador = payer.first_name
      ? `${payer.first_name} ${payer.last_name || ''}`
      : "Não informado";

    const pagamento = new Pagamento({
      txid: paymentInfo.body.id,
      valor: paymentInfo.body.transaction_amount,
      status: paymentInfo.body.status,
      nomePagador,
    });

    await pagamento.save();

    console.log("Pagamento salvo:", pagamento);
    res.status(200).send("Webhook recebido");
  } catch (err) {
    console.error("Erro ao processar webhook:", err);
    res.status(500).send("Erro ao salvar pagamento");
  }
};

// NOVO: Listar pagamentos para o frontend
export const listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find().sort({ createdAt: -1 });
    res.json(pagamentos);
  } catch (err) {
    console.error("Erro ao buscar pagamentos:", err);
    res.status(500).json({ error: "Erro ao buscar pagamentos" });
  }
};

