import fastify from "fastify"
import { Pool } from "pg"
import Cors from "@fastify/cors"
import dotenv from "dotenv";

dotenv.config();

import { verificarToken } from "./authMiddleware.js";

import jwt from "jsonwebtoken";

const server = fastify()

const sql = new Pool({
    database: "biblioteca_db",
    host: "localhost",
    user: "postgres",
    password: "senai",
    port: 5432
})

server.register(Cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})


server.post("/login", async (request, reply)=>{

    const {email, senha} = request.body;

    const resultado = await sql.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
    );

    if(resultado.rows.length === 0){

        return reply.status(401).send({
            message:"Usuário não encontrado."
        });

    }

    const usuario = resultado.rows[0];

    const token = jwt.sign(

        {
            id: usuario.id,
            nome: usuario.nome,
            perfil: usuario.perfil
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "8h"
        }

    );

    return reply.send({
        token
    });

});

server.get("/usuarios", async ()=>{
    const resultado = await sql.query("select * from usuarios")
    return resultado.rows
})

server.get(
    "/livros",
    {
        preHandler: verificarToken
    },
    async ()=>{

        const resultado = await sql.query(
            "SELECT * FROM livros"
        );

        return resultado.rows;

    }
);

server.post("/usuarios", async (request, reply)=>{
    const {nome, email, senha, perfil} = request.body;
    const resultado = await sql.query('insert into usuarios(nome, email, senha, perfil) values ($1, $2, $3, $4)', [nome, email, senha, perfil])
    reply.status(200).send({massage: "foi"})
})

server.post("/livros", async (request, reply)=>{
    const {titulo, autor, categoria, isbn, quantidade_total, quantidade_disponivel} = request.body;
    const resultado = await sql.query('insert into livros(titulo, autor, categoria, isbn, quantidade_total, quantidade_disponivel) values ($1, $2, $3, $4, $5, $6)', [titulo, autor, categoria, isbn, quantidade_total, quantidade_disponivel])
    reply.status(200).send({massage: "livro cadastrado"})
})


server.listen({port:3000})