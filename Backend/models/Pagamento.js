import mongoose from 'mongoose';

const PagamentoSchema = new mongoose.Schema({
  idPagamentoMP: { type: String, required: true, unique: true }, // ID que o Mercado Pago gera
  valor: Number,
  status: String,
  emailPagador: String,
  nomePagador: String,
  cpfPagador: String,
  descricao: String,
  dataPagamento: Date,
}, { timestamps: true });

export default mongoose.model('Pagamento', PagamentoSchema);