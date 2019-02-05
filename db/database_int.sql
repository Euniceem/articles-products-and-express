\c euniceem1007;
DROP DATABASE IF EXISTS products_articles;
CREATE DATABASE products_articles;

\c products_articles;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  price INT NOT NULL,
  inventory INT NOT NULL
);

DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  url_title VARCHAR(255) NOT NULL,
  title VARCHAR(255) UNIQUE,
  body VARCHAR(500) NOT NULL,
  author VARCHAR(100) NOT NULL
);

SELECT * FROM products;
SELECT * FROM articles;