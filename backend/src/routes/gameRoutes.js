
const express = require("express");

const {
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");

const { searchRawgGames } = require("../controllers/rawgController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// A rota de pesquisa precisa ficar antes de /:id.
router.get("/search", searchRawgGames);

router.post("/", createGame);
router.get("/", getGames);
router.get("/:id", getGameById);
router.put("/:id", updateGame);
router.patch("/:id", updateGame);
router.delete("/:id", deleteGame);

module.exports = router;
