
const express = require("express");

const {
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");

// 1. Substituímos as funções da RAWG pelas novas funções da IGDB
const { searchIgdbGames, exploreIgdbGames } = require("../controllers/igdbController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/search", searchIgdbGames);
router.get("/explore", exploreIgdbGames);

router.post("/", createGame);
router.get("/", getGames);
router.get("/:id", getGameById);
router.put("/:id", updateGame);
router.patch("/:id", updateGame);
router.delete("/:id", deleteGame);

module.exports = router;