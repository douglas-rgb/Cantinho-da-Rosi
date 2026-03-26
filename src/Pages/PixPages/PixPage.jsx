import { useEffect, useState } from "react";

export default function PixPage() {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/payment/pagamentos") // URL do backend
      .then((res) => res.json())
      .then((data) => {
        setPagamentos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar pagamentos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Pagamentos Pix</h1>

      {loading ? (
        <p>Carregando pagamentos...</p>
      ) : pagamentos.length === 0 ? (
        <p>Nenhum pagamento registrado ainda.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#6b21a8", color: "white" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #ddd" }}>Nome do Pagador</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ddd" }}>Valor (R$)</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ddd" }}>Status</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ddd" }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((p) => (
              <tr key={p._id}>
                <td style={{ padding: "0.5rem", border: "1px solid #ddd" }}>{p.nomePagador}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ddd" }}>{p.valor.toFixed(2)}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ddd" }}>{p.status}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ddd" }}>
                  {new Date(p.createdAt).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}