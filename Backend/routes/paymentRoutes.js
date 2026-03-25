import express from "express";
import { criarPagamento } from "../controllers/paymentController.js";
import payment from "../config/mp.js";

const router = express.Router();

// ROTA DE PAGAMENTO
router.post("/pagamento", criarPagamento);

// ROTA DE STATUS
router.get("/status/:id", async (req, res) => {
  try {
    const response = await payment.get({
      id: req.params.id,
    });

    res.json({
      status: response.status,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar status" });
  }
});

export default router;