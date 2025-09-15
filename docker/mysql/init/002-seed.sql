INSERT INTO users (name, email)
SELECT 'Admin', 'admin@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com');

INSERT INTO users (name, email)
SELECT 'User', 'user@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'user@example.com');


