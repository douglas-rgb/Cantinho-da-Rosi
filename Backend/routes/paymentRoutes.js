import express from "express";
import { criarPagamento } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/pagamento", criarPagamento);

export default router;