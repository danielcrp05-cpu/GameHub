
const searchRawgGames = async (req, res) => {
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

  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      message: "A chave da RAWG não está configurada no backend.",
    });
  }

  try {
    const url = new URL("https://api.rawg.io/api/games");
    url.searchParams.set("key", apiKey);
    url.searchParams.set("search", query);
    url.searchParams.set("page_size", "8");

    const response = await fetch(url);

    if (!response.ok) {
      console.error("A RAWG retornou o status:", response.status);

      return res.status(502).json({
        message: "Não foi possível pesquisar jogos na RAWG.",
      });
    }

    const data = await response.json();

    const results = (data.results || []).map((game) => ({
      rawgId: game.id,
      rawgSlug: game.slug || "",
      title: game.name || "",
      image: game.background_image || "",
      releaseYear: game.released
        ? Number(game.released.slice(0, 4))
        : "",
      genre: (game.genres || [])
        .map((genre) => genre.name)
        .join(", "),
      description: game.description_raw || "",
    }));

    return res.json({ results });
  } catch (error) {
    console.error("Erro ao consultar a RAWG:", error.message);

    return res.status(502).json({
      message: "Erro de conexão ao pesquisar jogos.",
    });
  }
};
// Converte um jogo da RAWG para o formato usado pelo front-end.
const mapRawgGame = (game) => ({
  rawgId: game.id,
  rawgSlug: game.slug || "",
  title: game.name || "",
  image: game.background_image || "",
  releaseYear: game.released ? Number(game.released.slice(0, 4)) : "",
  genre: (game.genres || []).map((genre) => genre.name).join(", "),
  platform: (game.parent_platforms || [])
    .map((item) => item.platform.name)
    .join(", "),
  rating: game.rating ? Number(game.rating.toFixed(1)) : null, // escala 0-5
  metacritic: game.metacritic || null,
});

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Catálogo para a aba "Explorar".
// Hoje devolve jogos aleatórios dentre os mais populares da RAWG.
// No futuro, para mostrar os mais bem avaliados do site, basta trocar
// esta função por uma consulta na coleção de avaliações (Rating).
const exploreRawgGames = async (req, res) => {
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      message: "A chave da RAWG não está configurada no backend.",
    });
  }

  const pageSize = Math.min(Math.max(Number(req.query.limit) || 12, 1), 24);
  const MAX_RANDOM_PAGE = 40;

  const fetchPage = async (page) => {
    const url = new URL("https://api.rawg.io/api/games");
    url.searchParams.set("key", apiKey);
    url.searchParams.set("ordering", "-added");
    url.searchParams.set("page_size", String(pageSize));
    url.searchParams.set("page", String(page));
    return fetch(url);
  };

  try {
    let response = await fetchPage(
      Math.floor(Math.random() * MAX_RANDOM_PAGE) + 1
    );

    // Página inexistente: volta para a primeira.
    if (response.status === 404) response = await fetchPage(1);

    if (!response.ok) {
      console.error("A RAWG retornou o status:", response.status);
      return res.status(502).json({
        message: "Não foi possível carregar o catálogo da RAWG.",
      });
    }

    const data = await response.json();

    const results = shuffle(
      (data.results || []).filter((game) => game.background_image)
    ).map(mapRawgGame);

    return res.json({ results });
  } catch (error) {
    console.error("Erro ao consultar a RAWG:", error.message);
    return res.status(502).json({
      message: "Erro de conexão ao carregar o catálogo.",
    });
  }
};

module.exports = { searchRawgGames, exploreRawgGames };
