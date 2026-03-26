// import express from "express";
// import cors from "cors";
// import paymentRoutes from "./routes/paymentRoutes.js";

// const app = express();

// app.use(cors()); // 🔥 LIBERA ACESSO

// app.use(express.json());

// app.use("/api", paymentRoutes);

// app.listen(3000, () => {
//   console.log("Servidor rodando na porta 3000 🚀");
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import paymentRouter from "./paymentRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas de pagamento
app.use("/api/payment", paymentRouter);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.log("Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));