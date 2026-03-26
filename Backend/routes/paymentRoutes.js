import express from "express";
import { criarPagamento, receberWebhook, listarPagamentos } from "../controllers/paymentControllers.js"
import payment from "../config/mp.js"; // Certifique-se que este é o export default de 'new Payment(client)'

const router = express.Router();

// ROTA DE PAGAMENTO
router.post("/pagamento", criarPagamento);

// ROTA DE STATUS (Corrigida)
router.get("/status/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // No SDK v2, usamos o método .get passando o objeto com ID
    const response = await payment.get({ id });

    res.json({
      id: response.id,
      status: response.status,
      status_detail: response.status_detail,
      external_reference: response.external_reference
    });
  } catch (error) {
    console.error("Erro ao buscar status no Mercado Pago:", error);
    
    // Tratamento de erro mais específico
    const statusCode = error.status || 500;
    res.status(statusCode).json({ 
      error: "Erro ao buscar status do pagamento",
      message: error.message 
    });
  }
});

// NOVA ROTA: Receber webhook do Pix
router.post("/webhook", receberWebhook);

// NOVA ROTA: Listar todos os pagamentos
router.get("/pagamentos", listarPagamentos);

export default router;
