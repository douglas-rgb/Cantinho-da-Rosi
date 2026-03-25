import payment from "../config/mp.js";

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