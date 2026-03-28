// import mongoose from 'mongoose';

// const PagamentoSchema = new mongoose.Schema({
//   // Mudei para 'idPagamentoMP' para bater com o que seu banco está pedindo
//   idPagamentoMP: { type: String, required: true, unique: true }, 
//   valor: Number,
//   status: { type: String, default: 'pending' },
//   nomePagador: String,
//   emailPagador: String,
//   produto: String,
//   updatedAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// export default mongoose.model('Pagamento', PagamentoSchema);

import mongoose from 'mongoose';

const PagamentoSchema = new mongoose.Schema({
  idPagamentoMP: { type: String, required: true, unique: true }, 
  valor: Number,
  status: { type: String, default: 'pending' },
  nomePagador: { type: String, default: 'Não informado' },
  emailPagador: String,
  produto: String,
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Pagamento', PagamentoSchema);