router.get("/status/:id", async (req, res) => {
  try {
    const payment = await mercadopago.payment.findById(req.params.id);

    res.json({
      status: payment.body.status,
    });
  } catch (error) {
    console.error("Erro ao buscar status:", error);
    res.status(500).json({ error: "Erro ao buscar status" });
  }
});