const Game = require("../models/Game");

const createGame = async (req, res, next) => {
  try {
    const game = await Game.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!game) {
      return res.status(404).json({ message: "Jogo não encontrado." });
    }

    res.json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const game = await Game.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!game) {
      return res.status(404).json({ message: "Jogo não encontrado." });
    }

    res.json(game);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!game) {
      return res.status(404).json({ message: "Jogo não encontrado." });
    }

    res.json({ message: "Jogo excluído com sucesso." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGame,
};
