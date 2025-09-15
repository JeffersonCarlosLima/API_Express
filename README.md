# API Express Base

Projeto base de API em Node.js com Express, MySQL e Docker. Inclui scripts de inicialização do banco, `docker-compose` para subir o MySQL localmente, e rotas de exemplo.

## Sumário
- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
  - [Variáveis de Ambiente (.env)](#variáveis-de-ambiente-env)
  - [Instalação de Dependências](#instalação-de-dependências)
- [Banco de Dados](#banco-de-dados)
  - [Rodando MySQL com Docker](#rodando-mysql-com-docker)
  - [Inicialização do Schema e Seed](#inicialização-do-schema-e-seed)
- [Executando a Aplicação](#executando-a-aplicação)
- [Rotas Disponíveis](#rotas-disponíveis)
- [Scripts NPM](#scripts-npm)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Solução de Problemas](#solução-de-problemas)
- [Licença](#licença)

## Visão Geral
- **Stack**: Node.js 18+, Express 4, MySQL 8, Jade (views), Docker.
- **Objetivo**: Servir como ponto de partida para uma API com persistência em MySQL, com setup rápido via Docker.

## Pré-requisitos
- **Node.js** 18+ e **npm**
- (Opcional, recomendado) **Docker Desktop** com **WSL2** habilitado (Windows)
- Acesso a um servidor **MySQL 8** (local via Docker ou instalado na máquina)

## Configuração do Ambiente

### Variáveis de Ambiente (.env)
Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo (ajuste conforme seu ambiente):

```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=express_api_db
```

Observações:
- `DB_HOST` deve apontar para onde o MySQL está rodando (no Docker publicado em 3306, use `localhost`).
- `DB_PASSWORD` deve corresponder à senha do usuário (no Docker padrão deste projeto, root/secret).

### Instalação de Dependências
No diretório do projeto:

```powershell
npm ci
```

Isso instalará as dependências listadas em `package-lock.json` garantindo reprodutibilidade.

## Banco de Dados

### Rodando MySQL com Docker
Este projeto já inclui um `docker-compose.yml` com um serviço MySQL configurado.

Para subir:

```powershell
npm run docker:up
```

Isso equivale a executar `docker compose up -d`, iniciando um container MySQL 8 publicado em `localhost:3306`, com o banco `express_api_db` e senha do root `secret`.

Para ver logs do MySQL:

```powershell
npm run docker:logs
```

Para derrubar os serviços:

```powershell
npm run docker:down
```

### Inicialização do Schema e Seed
Ao subir o container pela primeira vez, os scripts SQL em `docker/mysql/init/` são executados automaticamente:
- `001-schema.sql`: cria a tabela `users` (idempotente)
- `002-seed.sql`: insere registros básicos se não existirem

Alternativamente, é possível inicializar via Node (conexão MySQL necessária):

```powershell
npm run db:init
```

## Executando a Aplicação
Com `.env` configurado e MySQL ativo:

```powershell
npm start
```

A aplicação iniciará em `http://localhost:3000` (ou na porta definida em `PORT`).

## Rotas Disponíveis
- `GET /` — Renderiza uma página informando o status de conexão com o banco (OK/OFFLINE).
- `GET /users` — Retorna JSON com os usuários cadastrados (requer banco ativo).

## Scripts NPM
- **start**: inicia o servidor Express (`node ./bin/www`).
- **db:init**: cria banco e tabela `users` (se necessário) e insere seed via script Node.
- **docker:up**: `docker compose up -d` para subir MySQL.
- **docker:down**: `docker compose down` para derrubar os serviços.
- **docker:logs**: segue os logs do serviço MySQL.

## Estrutura de Pastas
```
.
├─ app.js                      # Configuração do Express e middlewares
├─ bin/www                     # Bootstrap do servidor HTTP
├─ routes/
│  ├─ index.js                 # Rota principal (/)
│  └─ users.js                 # Rota de usuários (/users)
├─ src/
│  └─ db.js                    # Pool de conexão MySQL via mysql2/promise
├─ scripts/
│  └─ init-db.js               # Inicialização do banco via Node
├─ docker-compose.yml          # Serviço MySQL
├─ docker/
│  └─ mysql/
│     └─ init/                 # Scripts SQL executados na criação do container
│        ├─ 001-schema.sql
│        └─ 002-seed.sql
├─ views/                      # Templates jade
├─ public/                     # Assets estáticos
├─ package.json
├─ package-lock.json
└─ README.md
```

## Solução de Problemas
- **Erro ECONNREFUSED ao conectar no MySQL**
  - Verifique se o MySQL está rodando: `npm run docker:up` (ou serviço local)
  - Teste a porta: `Test-NetConnection -ComputerName localhost -Port 3306` (PowerShell)
  - Confirme `.env` (host, porta, usuário e senha)
- **Rota `/users` retorna 500**
  - Geralmente é falha de conexão com o banco. Suba o MySQL, valide `.env` e tente novamente.
- **Docker não reconhecido no Windows**
  - Instale **Docker Desktop** e habilite **WSL2**. Reinicie o terminal após a instalação.
- **Permissões de porta**
  - Se `3306` estiver ocupada, altere o mapeamento em `docker-compose.yml` e ajuste `DB_PORT` no `.env`.

## Licença
Este projeto é disponibilizado sob a licença MIT. Sinta-se à vontade para usar e modificar.
