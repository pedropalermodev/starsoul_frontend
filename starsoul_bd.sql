IF EXISTS (SELECT name FROM sys.databases WHERE name = 'starsoul_bd')
BEGIN
    DROP DATABASE starsoul_bd;
END;
GO

CREATE DATABASE starsoul_bd;
GO

USE starsoul_bd;
GO

/* - - USUÁRIOS - - */
CREATE TABLE usuarios (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	senhaHash VARCHAR(255) NOT NULL,
	tipoConta VARCHAR(30) NOT NULL DEFAULT 'Usuário' CHECK (tipoConta IN ('Usuário', 'Administrador')),
	codStatus VARCHAR(10) NOT NULL DEFAULT 'Ativo' CHECK (codStatus IN ('Ativo', 'Inativo', 'Suspenso')),
	dataCadastro DATETIME NOT NULL DEFAULT GETDATE(),
	apelido VARCHAR(30) NULL,
	dataNascimento DATE NULL,
	genero VARCHAR(50) NULL
);

CREATE TABLE password_resets (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	email VARCHAR(100) NOT NULL,
	token VARCHAR(255) NOT NULL,
	token_expiry DATETIME DEFAULT GETDATE(),
	created_at DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (email) REFERENCES usuarios(email) ON DELETE CASCADE
);

INSERT INTO usuarios (nome, email, senhaHash, tipoConta, codStatus)
	VALUES ('Pedro Henrique Silva Palermo', 'pedropalermo.dev@gmail.com', '12345678', 'Administrador', 'Ativo');


/* - - CONSULTAS DE TESTE - - */
SELECT * FROM usuarios
SELECT * FROM password_resets