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

INSERT INTO usuarios (nome, email, senhaHash, tipoConta, codStatus)
	VALUES 
		('Pedro Henrique Silva Palermo', 'pedropalermo.dev@gmail.com', '12345678', 'Administrador', 'Ativo'),
		('Giovanna Ramos Lima', 'gi@gmail.com', '12345678', 'Usuário', 'Ativo');



/* - - REDEFINIR SENHA - - */
CREATE TABLE password_resets (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	email VARCHAR(100) NOT NULL,
	token VARCHAR(255) NOT NULL,
	token_expiry DATETIME DEFAULT GETDATE(),
	created_at DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (email) REFERENCES usuarios(email) ON DELETE CASCADE
);


/* - - REDEFINIR EMAIL - - */
CREATE TABLE email_verification_tokens (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	usuarioId INT NOT NULL,
	novoEmail VARCHAR(100) NOT NULL,
	token VARCHAR(255) NOT NULL,
	token_expiry DATETIME DEFAULT GETDATE(),
	created_at DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE,
);


/* - - CATEGORIAS - - */
CREATE TABLE categorias (
    id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(150) NULL,
    codStatus VARCHAR(10) NOT NULL DEFAULT 'Ativo' CHECK (codStatus IN ('Ativo', 'Inativo', 'Suspenso'))
);

INSERT INTO categorias (nome, codStatus)
	VALUES('Meditação para manhã', 'Ativo')


/* - - TAG - - */
CREATE TABLE tags (
    id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);


/* - - CONTEÚDOS - - */
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

INSERT INTO conteudos (titulo, codStatus, tipoConteudo, arquivoUrl)
VALUES
  ('Meditação da Manhã | ELEVE A VIBRAÇÃO', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=HgQqJOCgvEA'),
  ('MEDITAÇÃO DA MANHÃ: AME-SE (OS 5 MINUTOS MAIS PRECIOSOS DO SEU DIA)', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=wL9C_WJktAo'),
  ('Meditação para criar um dia maravilhoso - Meditação oficial Louise Hay', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=dYIUtHWSfK0'),
  ('Meditação da manhã: 10 minutos para ter um dia maravilhoso', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=59FH8nYCYXo'),
  ('MEDITAÇÃO DA MANHÃ: SEJA UM IMÃ DE BONS ACONTECIMENTOS (LEI DA ATRAÇÃO)', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=CYYIW-WHxN0'),
  ('Meditação Guiada | ENTREGA e CONFIANÇA', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=F-82J7DNOCQ'),
  ('MEDITAÇÃO GUIADA: 5 MINUTOS (RETORNE AO SEU PONTO DE EQUILÍBRIO)', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=_19x_vCtb-E'),
  ('Meditação Guiada - 5 MINUTOS', 'Ativo', 'Video', 'http://www.youtube.com/watch?v=fmBRuuQ0Gs8'),
  ('Meditação da Manhã para Ansiedade e Depressão - 10 Minutos', 'Ativo', 'Video', 'https://www.youtube.com/watch?v=s35G1h12t8w');



/* - - RELAÇÃO: CONTEÚDO x USUÁRIO - -*/
CREATE TABLE conteudo_usuario (
  id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
  usuarioId INT REFERENCES usuarios(id),
  conteudoId INT REFERENCES conteudos(id),
  favoritado BIT DEFAULT 0,
  dataUltimoAcesso DATETIME DEFAULT GETDATE(),
  numeroVisualizacoes INTEGER DEFAULT 0,
  UNIQUE(usuarioId, conteudoId)
);



/* - - RELAÇÃO: CONTEÚDO x TAG - -*/
CREATE TABLE conteudo_tag (
	conteudoId INT REFERENCES conteudos(id) ON DELETE CASCADE,
	tagId INT REFERENCES tags(id) ON DELETE CASCADE,
	PRIMARY KEY (conteudoId, tagId)
);


/* - - RELAÇÃO: CONTEÚDO x CATEGORIA - - */
CREATE TABLE conteudo_categoria (
	conteudoId INT REFERENCES conteudos(id) ON DELETE CASCADE,
	categoriaId INT REFERENCES categorias(id) ON DELETE CASCADE,
	PRIMARY KEY (conteudoId, categoriaId)
);

INSERT INTO conteudo_categoria (categoriaId, conteudoId)
	VALUES 
		(1, 1),
		(1, 2),
		(1, 3),
		(1, 4),
		(1, 5),
		(1, 6),
		(1, 7),
		(1, 8),
		(1, 9);


/* - - FEEDBACKS USUÁRIOS - - */
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
SELECT * FROM categorias
SELECT * FROM conteudo_categoria
SELECT * FROM conteudo_usuario