// Controllers de perfil público e de seguir usuários
const mongoose = require("mongoose");
const User = require("../models/User");
const Game = require("../models/Game");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const notFound = (res) =>
  res.status(404).json({ message: "Usuário não encontrado." });

// Dados do usuário logado (usado na tela de edição do perfil).
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name bio avatar libraryPublic"
    );

    if (!user) {
      return notFound(res);
    }

    res.json({
      id: user._id,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
      libraryPublic: user.libraryPublic !== false,
    });
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const { bio, avatar, libraryPublic } = req.body || {};
    const updates = {};

    if (bio !== undefined) {
      if (typeof bio !== "string") {
        return res.status(400).json({ message: "A bio deve ser um texto." });
      }
      updates.bio = bio.trim();
    }

    if (avatar !== undefined) {
      if (typeof avatar !== "string") {
        return res.status(400).json({ message: "A foto deve ser uma URL." });
      }

      const value = avatar.trim();
      if (value && !/^https?:\/\/\S+$/i.test(value)) {
        return res
          .status(400)
          .json({ message: "A foto deve ser uma URL http(s) válida." });
      }
      updates.avatar = value;
    }

    if (libraryPublic !== undefined) {
      if (typeof libraryPublic !== "boolean") {
        return res
          .status(400)
          .json({ message: "libraryPublic deve ser verdadeiro ou falso." });
      }
      updates.libraryPublic = libraryPublic;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Envie pelo menos um campo válido para atualizar.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("name bio avatar libraryPublic");

    if (!user) {
      return notFound(res);
    }

    res.json({
      id: user._id,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
      libraryPublic: user.libraryPublic !== false,
    });
  } catch (error) {
    next(error);
  }
};

// Perfil de qualquer usuário. O e-mail nunca é exposto.
const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return notFound(res);
    }

    const user = await User.findById(id).select(
      "name bio avatar libraryPublic following createdAt"
    );

    if (!user) {
      return notFound(res);
    }

    const isOwner = String(user._id) === String(req.user.id);
    const libraryVisible = isOwner || user.libraryPublic !== false;

    const [followersCount, gamesCount, followedByMe] = await Promise.all([
      User.countDocuments({ following: user._id }),
      libraryVisible ? Game.countDocuments({ owner: user._id }) : null,
      isOwner
        ? null
        : User.exists({ _id: req.user.id, following: user._id }),
    ]);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      followersCount,
      followingCount: user.following.length,
      gamesCount,
      libraryHidden: !libraryVisible,
      isOwner,
      isFollowing: Boolean(followedByMe),
    });
  } catch (error) {
    next(error);
  }
};

// Biblioteca de jogos de um usuário, respeitando a privacidade.
const getUserGames = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return notFound(res);
    }

    const user = await User.findById(id).select("libraryPublic");

    if (!user) {
      return notFound(res);
    }

    const isOwner = String(user._id) === String(req.user.id);

    if (!isOwner && user.libraryPublic === false) {
      return res.json({ games: [], hidden: true });
    }

    const games = await Game.find({ owner: user._id })
      .select("-owner")
      .sort({ createdAt: -1 });

    res.json({ games, hidden: false });
  } catch (error) {
    next(error);
  }
};

const setFollow = (shouldFollow) => async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return notFound(res);
    }

    if (String(id) === String(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Você não pode seguir a si mesmo." });
    }

    const target = await User.exists({ _id: id });

    if (!target) {
      return notFound(res);
    }

    // $addToSet e $pull são idempotentes: repetir a ação não duplica nada.
    await User.updateOne(
      { _id: req.user.id },
      shouldFollow
        ? { $addToSet: { following: id } }
        : { $pull: { following: id } }
    );

    const followersCount = await User.countDocuments({ following: id });

    res.json({ followersCount, isFollowing: shouldFollow });
  } catch (error) {
    next(error);
  }
};

const followUser = setFollow(true);
const unfollowUser = setFollow(false);

const searchUsers = async (req, res, next) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

    if (q.length < 2) {
      return res.json([]);
    }

    const users = await User.find({
      _id: { $ne: req.user.id },
      name: { $regex: escapeRegex(q), $options: "i" },
    })
      .select("name avatar")
      .sort({ name: 1 })
      .limit(20);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMe,
  updateMe,
  getProfile,
  getUserGames,
  followUser,
  unfollowUser,
  searchUsers,
};