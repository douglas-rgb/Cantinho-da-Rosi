import mercadopago from "../config/mp.js";

export const criarPagamento = async (req, res) => {
  try {
    const payment_data = {
      transaction_amount: 50,
      description: "Produto teste",
      payment_method_id: "pix",
      payer: {
        email: "teste@email.com",
      },
    };

    const response = await mercadopago.payment.create(payment_data);

    res.json(response.body);
  } catch (error) {
    console.error("Erro no pagamento:", error);
    res.status(500).json(error);
  }
};