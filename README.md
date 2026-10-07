# GameHub

Gerenciador de jogos desenvolvido com a stack MERN (MongoDB, Express, React e Node.js).

## Funcionalidades iniciais

- Cadastro de usuários
- Login com JWT
- Senhas protegidas com bcrypt
- CRUD completo de jogos
- Cada jogo pertence ao usuário autenticado
- Validações com Mongoose
- Middleware de autenticação
- Middleware de tratamento de erros
- CORS configurado
- Front-end React com hooks
- Consumo da API com Axios

## Estrutura

- `backend/`: API REST com Node.js, Express e MongoDB/Mongoose
- `frontend/`: aplicação React com Vite
- `docker-compose.yml`: execução opcional com Docker

## Executando localmente

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Configure o `.env` com sua conexão MongoDB e uma chave JWT segura.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

O front-end ficará disponível pelo endereço mostrado pelo Vite.

## API

### Autenticação

- `POST /api/auth/register`
- `POST /api/auth/login`

### Jogos

Todas as rotas de jogos exigem:

`Authorization: Bearer <token>`

Endpoints:

- `POST /api/games`
- `GET /api/games`
- `GET /api/games/:id`
- `PUT /api/games/:id`
- `DELETE /api/games/:id`

## Observação

O projeto é uma base inicial para o trabalho acadêmico e pode receber melhorias de interface, filtros, busca, avaliações, categorias e outras funcionalidades conforme a evolução do projeto.
