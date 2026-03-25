import mercadopago from "../config/mp.js";

export const criarPagamento = async (req, res) => {
  try {
    const { valor, produto, email } = req.body;

    console.log("VALOR:", valor);
    console.log("PRODUTO:", produto);
    console.log("EMAIL:", email);

    const payment_data = {
      transaction_amount: Number(valor),
      description: produto,
      payment_method_id: "pix",
      payer: {
        email: email,
      },
    };

    const response = await mercadopago.payment.create(payment_data);

    console.log("RESPOSTA MP:", response.body);

    res.json(response.body);
  } catch (error) {
    console.error("Erro completo:", error);
    res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
};