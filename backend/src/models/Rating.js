const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rawgId: {
      type: Number,
      required: true,
      min: 1,
    },
    score: {
      type: Number,
      required: true,
      min: 0.5,
      max: 5,
      validate: {
        validator: (value) => Number.isInteger(value * 2),
        message: "A nota deve ser um valor entre 0,5 e 5, em incrementos de 0,5.",
      },
    },
  },
  { timestamps: true }
);

// Um usuário só pode avaliar uma vez cada jogo da RAWG.
ratingSchema.index({ user: 1, rawgId: 1 }, { unique: true });

// Facilita consultar as avaliações de um jogo.
ratingSchema.index({ rawgId: 1 });

module.exports = mongoose.model("Rating", ratingSchema);