function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;   //obtiene el header de la peticion de autenticacion 
    const token = authHeader?.split(" ")[1];    //obtiene el token del header de la peticion

    if (!token) return res.status(401).json({ mensaje: "Token no enviado" });

    try {
        const decoded = jwt.verify(token, "clave_secreta");
        req.usuario = decoded; // Se guarda el payload (con rol incluido)
        next();
    } catch (err) {
        return res.status(403).json({ mensaje: "Token inválido" });
    }
}
