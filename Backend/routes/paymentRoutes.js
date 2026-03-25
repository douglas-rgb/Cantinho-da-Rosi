import payment from "../config/mp.js";

router.get("/status/:id", async (req, res) => {
  try {
    const response = await payment.get({
      id: req.params.id,
    });

    res.json({
      status: response.status,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar status" });
  }
});