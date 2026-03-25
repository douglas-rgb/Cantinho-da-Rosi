import payment from "../config/mp.js";

export const criarPagamento = async (req, res) => {
  try {
    const response = await payment.create({
      body: {
        transaction_amount: 50,
        description: "Produto teste",
        payment_method_id: "pix",
        payer: {
          email: "teste@email.com",
        },
      },
    });

    res.json(response);
  } catch (error) {
    console.error("Erro no pagamento:", error);
    res.status(500).json(error);
  }
};