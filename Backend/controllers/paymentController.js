import payment from "../config/mp.js";


// Criar pagamento Pix
export const criarPagamento = async (req, res) => {
  try {
    const { valor, produto, email, nome, sobrenome, cpf } = req.body;

    const response = await payment.create({
      body: {
        transaction_amount: Number(valor),
        description: produto,
        payment_method_id: "pix",
        payer: {
          email: email,
          first_name: nome,
          last_name: sobrenome,
          identification: {
            type: "CPF",
            number: cpf
          },
        },
      },
    });

    res.json(response);
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ error: error.message });
  }
};

// Receber webhook do Mercado Pago
export const receberWebhook = async (req, res) => {
  try {
    const { action, data } = req.body;

    // 1. O Mercado Pago envia várias notificações. Filtramos apenas 'payment.created' ou 'payment.updated'
    if (action === "payment.created" || action === "payment.updated") {
      const paymentId = data.id;

      // 2. Buscamos os detalhes do pagamento usando o ID recebido (SDK v2 usa .get)
      const paymentInfo = await payment.get({ id: paymentId });

      const payer = paymentInfo.payer || {};
      const nomePagador = payer.first_name 
        ? `${payer.first_name} ${payer.last_name || ''}`.trim() 
        : "Não informado";

      // 3. Atualiza se já existir (pelo txid) ou cria um novo (Upsert)
      const filter = { txid: String(paymentInfo.id) };
      const update = {
        valor: paymentInfo.transaction_amount,
        status: paymentInfo.status,
        nomePagador: nomePagador,
        updatedAt: new Date()
      };

      const resultado = await Pagamento.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Se não encontrar, ele cria
      });

      console.log("Pagamento processado:", resultado.status);
    }

    // O Mercado Pago exige um status 200 ou 201 para parar de enviar a mesma notificação
    res.status(200).send("OK");
  } catch (err) {
    console.error("Erro no Webhook:", err.message);
    res.status(500).send("Erro interno");
  }
};

// Listar pagamentos
export const listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find().sort({ createdAt: -1 });
    res.json(pagamentos);
  } catch (err) {
    console.error("Erro ao buscar pagamentos:", err);
    res.status(500).json({ error: "Erro ao buscar pagamentos" });
  }
};
