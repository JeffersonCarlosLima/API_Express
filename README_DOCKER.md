Executando MySQL com Docker para este projeto
============================================

1) Subir MySQL

```
docker compose up -d
```

2) Variáveis de ambiente da aplicação

Crie um arquivo `.env` na raiz com:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=express_api_db
```

3) Inicializar tabelas (opcional)

As tabelas e os dados seed já são criados automaticamente pelos scripts em `docker/mysql/init/` quando o container sobe. Se preferir via Node:

```
node scripts/init-db.js
```

4) Testar

- http://localhost:3000/
- http://localhost:3000/users


