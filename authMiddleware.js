import jwt from "jsonwebtoken";

export async function verificarToken(request, reply) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({
            message: "Token não informado."
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        request.usuario = usuario;

    } catch {

        return reply.status(401).send({
            message: "Token inválido."
        });

    }

}