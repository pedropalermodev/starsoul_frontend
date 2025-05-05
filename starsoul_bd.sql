IF EXISTS (SELECT name FROM sys.databases WHERE name = 'starsoul_bd')
BEGIN
    DROP DATABASE starsoul_bd;
END;
GO

CREATE DATABASE starsoul_bd;
GO

USE starsoul_bd;
GO

/* - - USU�RIOS - - */
CREATE TABLE usuarios (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	senhaHash VARCHAR(255) NOT NULL,
	tipoConta VARCHAR(30) NOT NULL DEFAULT 'Usu�rio' CHECK (tipoConta IN ('Usu�rio', 'Administrador')),
	codStatus VARCHAR(10) NOT NULL DEFAULT 'Ativo' CHECK (codStatus IN ('Ativo', 'Inativo', 'Suspenso')),
	dataCadastro DATETIME NOT NULL DEFAULT GETDATE(),
	apelido VARCHAR(30) NULL,
	dataNascimento DATE NULL,
	genero VARCHAR(50) NULL
);

INSERT INTO usuarios (nome, email, senhaHash, tipoConta, codStatus)
	VALUES ('Pedro Henrique Silva Palermo', 'pedropalermo.dev@gmail.com', '12345678', 'Administrador', 'Ativo');



/* - - REDEFINIR SENHA - - */
CREATE TABLE password_resets (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	email VARCHAR(100) NOT NULL,
	token VARCHAR(255) NOT NULL,
	token_expiry DATETIME DEFAULT GETDATE(),
	created_at DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (email) REFERENCES usuarios(email) ON DELETE CASCADE
);


/* - - CATEGORIAS - - */
CREATE TABLE categorias (
    id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(150) NULL,
    codStatus VARCHAR(10) NOT NULL DEFAULT 'Ativo' CHECK (codStatus IN ('Ativo', 'Inativo', 'Suspenso'))
);


/* - - TAG - - */
CREATE TABLE tags (
    id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);


/* - - CONTE�DOS - - */
CREATE TABLE conteudos (
    id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    caminhoMiniatura VARCHAR(255) NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NULL,
    codStatus VARCHAR(10) NOT NULL DEFAULT 'Ativo' CHECK (codStatus IN ('Ativo', 'Inativo', 'Suspenso')),
    tipoConteudo VARCHAR(5) NOT NULL CHECK (tipoConteudo IN ('Audio', 'Video', 'Texto')),
    arquivoUrl VARCHAR(255) NOT NULL,
	dataPublicacao DATETIME NOT NULL DEFAULT GETDATE()
);


/* - - RELA��O: CONTE�DO x TAG - -*/
CREATE TABLE conteudo_tag (
	conteudoId INT REFERENCES conteudos(id) ON DELETE CASCADE,
	tagId INT REFERENCES tags(id) ON DELETE CASCADE,
	PRIMARY KEY (conteudoId, tagId)
);


/* - - RELA��O: CONTE�DO x CATEGORIA - - */
CREATE TABLE conteudo_categoria (
	conteudoId INT REFERENCES conteudos(id) ON DELETE CASCADE,
	categoriaId INT REFERENCES categorias(id) ON DELETE CASCADE,
	PRIMARY KEY (conteudoId, categoriaId)
);


/* - - FEEDBACKS USU�RIOS - - */
CREATE TABLE feedbacks (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	assunto VARCHAR(150) NOT NULL,
	mensagem TEXT NOT NULL,
	dataEnvio DATETIME NOT NULL DEFAULT GETDATE()
);


/* - - CONSULTAS DE TESTE - - */
SELECT * FROM usuarios
SELECT * FROM conteudos
SELECT * FROM tags
SELECT * FROM categorias
SELECT * FROM feedbacks
SELECT * FROM conteudo_categoria
SELECT * FROM conteudo_tag