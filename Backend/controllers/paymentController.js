export const criarPagamento = async (req, res) => {
  try {
    const { valor, produto, email } = req.body;

    const response = await payment.create({
      body: {
        transaction_amount: Number(valor),
        description: produto,
        payment_method_id: "pix",
        payer: {
          email: email,
        },
      },
    });

    res.json(response);
  } catch (error) {
    console.error("Erro no pagamento:", error);
    res.status(500).json(error);
  }
};