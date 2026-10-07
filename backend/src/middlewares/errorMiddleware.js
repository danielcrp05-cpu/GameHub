const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Dados inválidos.",
      errors: Object.values(err.errors).map((item) => item.message),
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "Registro duplicado." });
  }

  res.status(500).json({ message: "Erro interno do servidor." });
};

module.exports = errorMiddleware;
