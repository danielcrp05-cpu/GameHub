const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Título é obrigatório."],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    genre: {
      type: String,
      required: [true, "Gênero é obrigatório."],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, "Plataforma é obrigatória."],
      enum: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile", "Outro"],
    },
    releaseYear: {
      type: Number,
      min: 1950,
      max: new Date().getFullYear(),
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Quero jogar", "Jogando", "Finalizado", "Abandonado"],
      default: "Quero jogar",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
