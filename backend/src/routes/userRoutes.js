const express = require("express");

const {
  getMe,
  updateMe,
  getProfile,
  getUserGames,
  followUser,
  unfollowUser,
  searchUsers,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// /search e /me precisam ficar antes de /:id.
router.get("/search", searchUsers);
router.get("/me", getMe);
router.put("/me", updateMe);

router.get("/:id", getProfile);
router.get("/:id/games", getUserGames);
router.post("/:id/follow", followUser);
router.delete("/:id/follow", unfollowUser);

module.exports = router;