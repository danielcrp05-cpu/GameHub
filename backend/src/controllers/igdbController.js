const { fetchFromIGDB } = require("../services/igdbService");

const searchIgdbGames = async (req, res, next) => {
  const query = String(req.query.query || "").trim();

  if (query.length < 2) {
    return res.status(400).json({
      message: "Digite pelo menos 2 caracteres para pesquisar.",
    });
  }

  if (query.length > 100) {
    return res.status(400).json({
      message: "A pesquisa deve ter no máximo 100 caracteres.",
    });
  }

  try {
    // Linguagem Apicalypse da IGDB para busca por termo
    // Buscamos o ID, slug, nome, capa, resumo, data de lançamento, gêneros, plataformas e rating
    const igdbQuery = `
      search "${query}";
      fields name, slug, summary, first_release_date, rating, aggregated_rating, cover.url, genres.name, platforms.name;
      limit 8;
    `;

    const data = await fetchFromIGDB("games", igdbQuery);

    const results = (data || []).map((game) => ({
      rawgId: game.id, // Mantemos a chave "rawgId" para não quebrar o front-end atual
      rawgSlug: game.slug || "",
      title: game.name || "",
      // Ajuste na URL da imagem da IGDB (cover.url costuma vir sem o "https:" e em tamanho pequeno, trocamos para thumb/720p se necessário)
      image: game.cover && game.cover.url 
        ? `https:${game.cover.url.replace("t_thumb", "t_720p")}` 
        : "",
      releaseYear: game.first_release_date
        ? new Date(game.first_release_date * 1000).getFullYear()
        : "",
      genre: (game.genres || [])
        .map((genre) => genre.name)
        .join(", "),
      platform: (game.platforms || [])
        .map((platform) => platform.name)
        .join(", "),
      rating: game.rating ? Number((game.rating / 20).toFixed(1)) : null, // IGDB usa rating de 0-100, convertemos para 0-5 para manter o padrão
      metacritic: game.aggregated_rating ? Math.round(game.aggregated_rating) : null,
      description: game.summary || "",
    }));

    return res.json({ results });
  } catch (error) {
    console.error("Erro ao consultar a IGDB:", error.message);
    return res.status(502).json({
      message: "Erro de conexão ao pesquisar jogos.",
    });
  }
};

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const mapIgdbGame = (game) => ({
  rawgId: game.id,
  rawgSlug: game.slug || "",
  title: game.name || "",
  image: game.cover && game.cover.url 
    ? `https:${game.cover.url.replace("t_thumb", "t_720p")}` 
    : "",
  releaseYear: game.first_release_date
    ? new Date(game.first_release_date * 1000).getFullYear()
    : "",
  genre: (game.genres || []).map((genre) => genre.name).join(", "),
  platform: (game.platforms || [])
    .map((item) => item.name)
    .join(", "),
  rating: game.rating ? Number((game.rating / 20).toFixed(1)) : null, // Normalizado para 0-5
  metacritic: game.aggregated_rating ? Math.round(game.aggregated_rating) : null,
});

const exploreIgdbGames = async (req, res, next) => {
  const pageSize = Math.min(Math.max(Number(req.query.limit) || 12, 1), 24);

  try {
    // Como a IGDB lida bem com ordenação e limite, pegamos os mais bem avaliados e com capa
    const igdbQuery = `
      fields name, slug, summary, first_release_date, rating, aggregated_rating, cover.url, genres.name, platforms.name;
      where rating != null & cover != null;
      sort rating desc;
      limit 50;
    `;

    const data = await fetchFromIGDB("games", igdbQuery);

    // Embaralhamos o resultado para dar a sensação de catálogo dinâmico igual o seu código anterior
    const results = shuffle(data || [])
      .slice(0, pageSize)
      .map(mapIgdbGame);

    return res.json({ results });
  } catch (error) {
    console.error("Erro ao consultar a IGDB:", error.message);
    return res.status(502).json({
      message: "Erro de conexão ao carregar o catálogo.",
    });
  }
};

module.exports = { searchIgdbGames, exploreIgdbGames };