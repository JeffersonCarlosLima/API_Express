require('dotenv').config();
const mysql = require('mysql2/promise');

async function ensureDatabaseAndTables() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  const databaseName = process.env.DB_NAME || 'express_api_db';
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.changeUser({ database: databaseName });

  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  const [rows] = await connection.query('SELECT COUNT(*) AS total FROM users');
  if (rows[0].total === 0) {
    await connection.query('INSERT INTO users (name, email) VALUES (?, ?), (?, ?)', [
      'Admin', 'admin@example.com',
      'User', 'user@example.com'
    ]);
  }

  await connection.end();
  console.log(`Banco e tabelas prontos em ${databaseName}`);
}

ensureDatabaseAndTables().catch((err) => {
  console.error('Erro ao inicializar banco:', err);
  process.exit(1);
});



