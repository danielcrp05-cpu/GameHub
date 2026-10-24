# GameHub

**GameHub** é uma aplicação web para gerenciamento de jogos, desenvolvida com a stack MERN (MongoDB, Express, React e Node.js). O projeto permite que usuários gerenciem sua biblioteca de jogos por meio de uma interface com identidade visual gamer, tema escuro e detalhes em neon.

O projeto faz parte de uma atividade acadêmica de **Design e Componentização Front-end com Inteligência Artificial**, utilizando ferramentas de IA para apoiar a criação do protótipo e o desenvolvimento da interface.

## Funcionalidades

### Usuários e autenticação
- Cadastro de usuários.
- Login com autenticação JWT.
- Proteção de senhas com bcrypt.
- Rotas protegidas por middleware de autenticação.
- Associação dos jogos ao usuário autenticado.

### Gerenciamento de jogos
- Cadastro de jogos.
- Listagem dos jogos cadastrados.
- Consulta de um jogo específico.
- Edição de jogos.
- Exclusão de jogos.
- Validações de dados com Mongoose.
- Comunicação entre o front-end e a API REST utilizando Axios.

### Interface
- Dashboard inicial com identidade visual gamer.
- Tema escuro com detalhes em azul e ciano neon.
- Componentes React reutilizáveis.
- Navegação entre as páginas da aplicação.
- Catálogo para gerenciamento da biblioteca de jogos.
- Interface desenvolvida com React e Vite.

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| MongoDB | Banco de dados NoSQL |
| Express.js | Construção da API REST |
| React | Construção da interface |
| Node.js | Ambiente de execução do backend |
| Vite | Desenvolvimento e build do frontend |
| Mongoose | Modelagem e validação dos dados |
| Axios | Requisições HTTP para a API |
| React Router | Navegação entre páginas |
| JWT | Autenticação de usuários |
| bcrypt | Proteção de senhas |
| Lucide React | Ícones da interface |
| Docker Compose | Opção de execução dos serviços em contêineres |

## Estrutura do projeto

```text
GameHub/
├── backend/
│   ├── ...
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── docker-compose.yml
└── README.md
```

- `backend/`: API REST, autenticação, regras de negócio e integração com MongoDB.
- `frontend/`: aplicação React com Vite, páginas, componentes reutilizáveis e integração com a API.
- `docker-compose.yml`: configuração para execução opcional dos serviços com Docker.

## Como executar localmente

### Pré-requisitos

- Node.js e npm instalados.
- MongoDB local ou uma instância acessível.
- Git, caso queira clonar o repositório.

### 1. Clonar o repositório

```bash
git clone https://github.com/danielcrp05-cpu/GameHub.git
cd GameHub
```

### 2. Configurar e executar o backend

Abra um terminal na raiz do projeto e execute:

```bash
cd backend
npm install
```

Se existir o arquivo `.env.example`, copie-o para `.env`:

```bash
cp .env.example .env
```

No Windows PowerShell, também é possível utilizar:

```powershell
Copy-Item .env.example .env
```

Configure as variáveis de ambiente necessárias, incluindo a conexão com o MongoDB e uma chave JWT segura, conforme a configuração do backend.

Inicie o servidor:

```bash
npm run dev
```

### 3. Configurar e executar o frontend

Abra outro terminal:

```bash
cd frontend
npm install
```

Se existir o arquivo `.env.example`, copie-o para `.env`:

```bash
cp .env.example .env
```

Configure a URL da API conforme as variáveis utilizadas pelo projeto.

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação, normalmente `http://localhost:5173`.

> **Importante:** o backend e o MongoDB precisam estar configurados e disponíveis para que as funcionalidades dependentes da API funcionem corretamente.

### 4. Gerar o build do frontend

Na pasta `frontend`, execute:

```bash
npm run build
```

Esse comando verifica a compilação da aplicação para produção.

## API REST

As rotas abaixo representam os endpoints documentados neste README. A disponibilidade exata deve ser conferida na implementação do backend.

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário |
| POST | `/api/auth/login` | Autenticação de usuário |

### Jogos

As rotas de jogos exigem autenticação por token JWT, enviado no cabeçalho HTTP:

```http
Authorization: Bearer <token>
```

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/games` | Cadastrar jogo |
| GET | `/api/games` | Listar jogos do usuário autenticado |
| GET | `/api/games/:id` | Consultar jogo específico |
| PUT | `/api/games/:id` | Atualizar jogo |
| DELETE | `/api/games/:id` | Excluir jogo |

## Design e desenvolvimento com IA

A atividade utiliza ferramentas de inteligência artificial como apoio ao processo de concepção visual e desenvolvimento da interface.

### Processo de criação

1. **Planejamento visual:** definição da proposta visual do GameHub, com tema gamer, fundo escuro e cores neon.
2. **Prototipação:** exploração de referências e propostas de interface utilizando ferramentas de IA.
3. **Geração da interface:** utilização do v0 para gerar uma proposta de dashboard.
4. **Adaptação ao projeto:** adequação da interface gerada à estrutura existente, mantendo React, JavaScript e Vite.
5. **Integração:** conexão dos componentes visuais aos dados e funcionalidades já disponibilizados pelo backend.
6. **Validação:** execução da aplicação e verificação do build.

### Ferramentas utilizadas

- **Google Stitch:** exploração e prototipação visual da interface.
- **v0 by Vercel:** geração de uma proposta de dashboard e componentes de interface.
- **ChatGPT:** apoio à análise, adaptação e integração da interface ao projeto existente.

### Prompts utilizados

Para atender ao requisito de documentação dos prompts, registre abaixo os textos exatos utilizados nas ferramentas durante a atividade.

- **Google Stitch:** inserir o prompt original utilizado para gerar o protótipo.
- **v0 by Vercel:** inserir o prompt original utilizado para gerar o dashboard.

Os prompts originais devem ser transcritos a partir do histórico das ferramentas, sem substituí-los por versões reconstruídas.

## Captura de tela

Adicione uma captura de tela da versão final do dashboard nesta seção.

Sugestão de organização:

```text
GameHub/
└── docs/
    └── dashboard.png
```

Depois de salvar a imagem nesse caminho, inclua-a no README:

```markdown
![Dashboard do GameHub](docs/dashboard.png)
```

A captura deve mostrar a interface final executando no navegador.

## Objetivos acadêmicos

O projeto busca aplicar os conceitos de desenvolvimento de interfaces com React, componentização, reutilização de código, integração com uma API e uso de ferramentas de inteligência artificial no processo de design e desenvolvimento.

Na entrega, devem ser conferidos os seguintes requisitos da atividade:

- Utilização de React com Vite e JavaScript.
- Organização do código em componentes reutilizáveis.
- Utilização de pelo menos três componentes reutilizáveis.
- Uso de pelo menos seis objetos de dados JSON armazenados em `useState`, conforme solicitado na atividade.
- Renderização de listas com `.map()` e identificadores únicos na propriedade `key`.
- Registro dos prompts utilizados nas ferramentas de IA.
- Inclusão de captura de tela da interface final.
- Repositório público no GitHub e histórico de commits.

**Observação:** o requisito de seis objetos JSON em `useState` deve ser conferido no código final. Os jogos carregados da API não devem ser substituídos por dados fictícios apenas para cumprir esse requisito. Caso necessário, a atividade deve ser atendida em um contexto de demonstração separado e claramente identificado.

## Segurança

- Não publique arquivos `.env` com credenciais.
- Não compartilhe senhas, tokens JWT ou chaves privadas.
- Utilize variáveis de ambiente para configurações sensíveis.
- Configure o MongoDB e as permissões de acesso adequadamente.

## Repositório

GitHub: https://github.com/danielcrp05-cpu/GameHub

---

**GameHub — sua biblioteca de jogos em um só lugar.**