
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

module.exports = { searchRawgGames };
