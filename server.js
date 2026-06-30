import fastify from "fastify"
import { Pool } from "pg"
import Cors from "@fastify/cors"

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




server.listen({port:3000})