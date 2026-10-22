const express = require("express");

const {
  getCommunityRating,
  getMyRating,
  saveRating,
} = require("../controllers/ratingController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Consulta pública: média e quantidade de avaliações de um jogo.
router.get("/:rawgId/community", getCommunityRating);

// Operações pessoais: exigem autenticação.
router.get("/:rawgId/me", authMiddleware, getMyRating);
router.put("/:rawgId/me", authMiddleware, saveRating);

module.exports = router;