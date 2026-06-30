create type perfil_user as enum ('ADMIN', 'BIBLIOTECARIO');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil perfil_user NOT NULL
        CHECK (perfil IN ('ADMIN', 'BIBLIOTECARIO'))
);

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    turma VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(150)
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    quantidade_total INTEGER NOT NULL
        CHECK (quantidade_total >= 0),
    quantidade_disponivel INTEGER NOT NULL
        CHECK (quantidade_disponivel >= 0)
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,

    fk_aluno INTEGER
        REFERENCES alunos(id)
        ON DELETE CASCADE,

    fk_livro INTEGER
        REFERENCES livros(id)
        ON DELETE CASCADE,

    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_prevista DATE NOT NULL,
    data_devolucao DATE,

    status VARCHAR(20) NOT NULL DEFAULT 'EMPRESTADO'
        CHECK (status IN ('EMPRESTADO', 'DEVOLVIDO', 'ATRASADO'))
);

CREATE INDEX idx_livros_titulo
ON livros(titulo);

CREATE INDEX idx_livros_autor
ON livros(autor);

CREATE INDEX idx_livros_categoria
ON livros(categoria);

CREATE INDEX idx_emprestimos_status
ON emprestimos(status);