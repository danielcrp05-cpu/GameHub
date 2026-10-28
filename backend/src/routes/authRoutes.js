const express = require("express");

const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Apenas usuários autenticados podem alterar a senha.
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;