CREATE DATABASE IF NOT EXISTS freelaboard;

USE freelaboard;
CREATE TABLE IF NOT EXISTS `user` (
  id PRIMARY KEY AUTO_INCREMENT int not null,
  username VARCHAR(100) not null,
  email VARCHAR(100) not null,
  password VARCHAR(100) not null
);