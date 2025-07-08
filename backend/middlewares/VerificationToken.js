const jwt = require("jsonwebtoken");

function verificationToken(req, res, next) {
    const authHeader = req.headers.authorization;   //obtiene el header de la peticion de autenticacion 
    const token = authHeader?.split(" ")[1];    //obtiene el token del header de la peticion

    console.log("Token recibido:", token);

    if (!token) return res.status(401).json({ mensaje: "Token no enviado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decodificado:", decoded);
        req.user = decoded; // Se guarda el payload (con rol incluido)
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: "Token inválido" });
    }
}

module.exports = verificationToken;
