import jwt from "jsonwebtoken";

export async function verificarToken(request, reply){

    const authHeader = request.headers.authorization;

    if(!authHeader){
        return reply.status(401).send({
            message:"Token não informado."
        });
    }

    const token = authHeader.split({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6InBhdWxvIiwicGVyZmlsIjoiQURNSU4iLCJpYXQiOjE3ODI5MTUzMTMsImV4cCI6MTc4Mjk0NDExM30.JiIvF4h9Xdpc5GAmTAlTAlD5Fg5XwZfFunyn_SdyASM"})[1];

    try{

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        request.usuario = usuario;

    }catch{

        return reply.status(401).send({
            message:"Token inválido."
        });

    }

}