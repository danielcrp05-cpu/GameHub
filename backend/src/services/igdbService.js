// src/services/igdbService.js
let cachedToken = null;
let tokenExpiresAt = 0;

async function getTwitchToken() {
  // Se o token ainda for válido (com margem de segurança de 1 hora), reutiliza
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao autenticar com a Twitch/IGDB');
  }

  cachedToken = data.access_token;
  // expires_in vem em segundos, convertemos para milissegundos e tiramos 1 hora de segurança
  tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 3600000;

  return cachedToken;
}

async function fetchFromIGDB(endpoint, queryBody) {
  const token = await getTwitchToken();
  const clientId = process.env.TWITCH_CLIENT_ID;

  const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
    body: queryBody,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na API da IGDB: ${errorText}`);
  }

  return await response.json();
}

module.exports = { fetchFromIGDB };