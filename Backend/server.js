import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // 1. Adicionado para carregar as variáveis de ambiente
import paymentRoutes from "./routes/paymentRoutes.js";

// Carregar variáveis do arquivo .env
dotenv.config();

const app = express();

// Configuração do CORS (2. Melhorado: permite que o frontend acesse os headers se necessário)
app.use(cors({
  origin: "*", // Em produção, substitua pelo domínio do seu site
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para JSON (3. Importante: Webhooks do MP usam JSON)
app.use(express.json());

// Rotas
app.use("/api", paymentRoutes);

// Porta dinâmica (4. Melhor para deploy em serviços como Render ou Railway)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
