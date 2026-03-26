
import mongoose from "mongoose";

const pagamentoSchema = new mongoose.Schema({
  txid: { type: String, required: true },
  valor: { type: Number, required: true },
  status: { type: String, required: true },
  nomePagador: { type: String, default: "Não informado" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Pagamento", pagamentoSchema);