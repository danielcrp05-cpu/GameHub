const mongoose = require("mongoose");
const Rating = require("../models/Rating");

const isValidRawgId = (value) => {
  const rawgId = Number(value);

  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "" &&
    Number.isSafeInteger(rawgId) &&
    rawgId > 0
  );
};

const getCommunityRating = async (req, res, next) => {
  try {
    if (!isValidRawgId(req.params.rawgId)) {
      return res.status(400).json({
        message: "Identificador RAWG inválido.",
      });
    }

    const rawgId = Number(req.params.rawgId);

    const result = await Rating.aggregate([
      { $match: { rawgId } },
      {
        $group: {
          _id: "$rawgId",
          average: { $avg: "$score" },
          count: { $sum: 1 },
        },
      },
    ]);

    return res.json({
      rawgId,
      average: result.length
        ? Math.round(result[0].average * 100) / 100
        : null,
      count: result.length ? result[0].count : 0,
    });
  } catch (error) {
    next(error);
  }
};

const getMyRating = async (req, res, next) => {
  try {
    if (!isValidRawgId(req.params.rawgId)) {
      return res.status(400).json({
        message: "Identificador RAWG inválido.",
      });
    }

    const rating = await Rating.findOne({
      user: req.user.id,
      rawgId: Number(req.params.rawgId),
    });

    return res.json({
      rating: rating ? rating.score : null,
    });
  } catch (error) {
    next(error);
  }
};

const saveRating = async (req, res, next) => {
  try {
    if (!isValidRawgId(req.params.rawgId)) {
      return res.status(400).json({
        message: "Identificador RAWG inválido.",
      });
    }

    const score = req.body.score;

    if (
      typeof score !== "number" ||
      !Number.isFinite(score) ||
      score < 0.5 ||
      score > 5 ||
      !Number.isInteger(score * 2)
    ) {
      return res.status(400).json({
        message: "A nota deve ser entre 0,5 e 5, em incrementos de 0,5.",
      });
    }

    const rawgId = Number(req.params.rawgId);

    const rating = await Rating.findOneAndUpdate(
      {
        user: req.user.id,
        rawgId,
      },
      {
        $set: { score },
        $setOnInsert: {
          user: req.user.id,
          rawgId,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({
      message: "Avaliação salva com sucesso.",
      rating: rating.score,
    });
  } catch (error) {
    // Protege contra uma eventual corrida entre duas criações simultâneas.
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Não foi possível registrar a avaliação simultaneamente. Tente novamente.",
      });
    }

    next(error);
  }
};

module.exports = {
  getCommunityRating,
  getMyRating,
  saveRating,
};