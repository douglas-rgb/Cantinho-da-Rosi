import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors()); // 🔥 LIBERA ACESSO

app.use(express.json());

app.use("/api", paymentRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});