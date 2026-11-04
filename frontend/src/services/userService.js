import api from "./api";

// gamesCount, libraryHidden, isOwner, isFollowing }
export const getProfile = (id) =>
  api.get(`/users/${id}`).then((response) => response.data);

// Biblioteca do usuário. Resposta: { games, hidden }
export const getUserGames = (id) =>
  api.get(`/users/${id}/games`).then((response) => response.data);

// Dados do usuário logado. Resposta: { id, name, bio, avatar, libraryPublic }
export const getMe = () => api.get("/users/me").then((response) => response.data);

// Corpo: { bio, avatar, libraryPublic }
export const updateMe = (data) =>
  api.put("/users/me", data).then((response) => response.data);

// Resposta: { followersCount, isFollowing }
export const followUser = (id) =>
  api.post(`/users/${id}/follow`).then((response) => response.data);

export const unfollowUser = (id) =>
  api.delete(`/users/${id}/follow`).then((response) => response.data);

// Resposta: [{ _id, name, avatar }]
export const searchUsers = (q) =>
  api.get("/users/search", { params: { q } }).then((response) => response.data);