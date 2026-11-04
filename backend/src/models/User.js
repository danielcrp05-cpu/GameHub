const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório."],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória."],
      minlength: 6,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [200, "A bio deve ter no máximo 200 caracteres."],
      default: "",
    },
    avatar: {
      type: String,
      trim: true,
      maxlength: [500, "A URL da foto é muito longa."],
      default: "",
    },
    // Quando false, só o próprio usuário enxerga a biblioteca de jogos.
    libraryPublic: {
      type: Boolean,
      default: true,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Facilita contar os seguidores de um usuário.
userSchema.index({ following: 1 });

module.exports = mongoose.model("User", userSchema);