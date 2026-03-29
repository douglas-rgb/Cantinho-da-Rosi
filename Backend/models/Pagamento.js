

// import mongoose from 'mongoose';

// const PagamentoSchema = new mongoose.Schema({
//   idPagamentoMP: { type: String, required: true, unique: true }, 
//   valor: Number,
//   status: { type: String, default: 'pending' },
//   nomePagador: { type: String, default: 'Não informado' },
//   emailPagador: String,
//   produto: String,
//   updatedAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// export default mongoose.model('Pagamento', PagamentoSchema);

import mongoose from "mongoose";

const pagamentoSchema = new mongoose.Schema(
  {
    idPagamentoMP: String,
    valor: Number,
    status: String,
    emailPagador: String,
    nomePagador: String,
    cpfPagador: String,
    bancoPagador: String,
  },
  { timestamps: true }
);

export default mongoose.model("Pagamento", pagamentoSchema);