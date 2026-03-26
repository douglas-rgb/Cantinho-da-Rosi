// import express from "express";
// import { criarPagamento, receberWebhook, listarPagamentos } from "../controllers/paymentControllers.js";
// import payment from "../config/mp.js";

// const router = express.Router();

// // ROTA DE PAGAMENTO (mantida)
// router.post("/pagamento", criarPagamento);

// // ROTA DE STATUS (mantida)
// router.get("/status/:id", async (req, res) => {
//   try {
//     const response = await payment.get({
//       id: req.params.id,
//     });

//     res.json({
//       status: response.status,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao buscar status" });
//   }
// });

// // NOVA ROTA: Receber webhook do Pix
// router.post("/webhook", receberWebhook);

// // NOVA ROTA: Listar todos os pagamentos
// router.get("/pagamentos", listarPagamentos);

// export default router;

import express from "express";
import { criarPagamento, receberWebhook, listarPagamentos } from "../controllers/paymentControllers.js";
import payment from "../config/mp.js";

const router = express.Router();

// Criar pagamento Pix
router.post("/pagamento", criarPagamento);

// Consultar status de pagamento
router.get("/status/:id", async (req, res) => {
  try {
    const response = await payment.get({ id: req.params.id });
    res.json({ status: response.status });
  } catch (error) {
    console.error("Erro ao buscar status:", error);
    res.status(500).json({ error: "Erro ao buscar status" });
  }
});

// Receber webhook Pix
router.post("/webhook", receberWebhook);

// Listar pagamentos
router.get("/pagamentos", listarPagamentos);

export default router;