CREATE DATABASE gpu

GRANT ALL PRIVILEGES ON hardware * TO user;
USE hardware;
CREATE TABLE gpu (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    brand   VARCHAR(50),
    model    VARCHAR(50),
    price    NUMERIC,
    vram    NUMERIC,
    PRIMARY KEY("id" AUTOINCREMENT)
);
