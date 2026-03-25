import payment from "../config/mp.js";

export const criarPagamento = async (req, res) => {
  try {
    const { valor, produto, email } = req.body;

    const response = await payment.create({
      body: {
        transaction_amount: Number(valor),
        description: produto,
        payment_method_id: "pix",
        payer: {
          email: "test_user_123@testuser.com",
        },
      },
    });

    res.json(response);
  } catch (error) {
  console.error("ERRO STATUS:", error);
  res.status(500).json({ error: error.message });
}
};