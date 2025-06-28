function verificationRol(rolRequired) {
    return (req, res, next) => {
        console.log("Rol recibido del token:", req.user.rol);
        if (req.user.rol !== rolRequired) {
            return res.status(403).json({ mensaje: "No tenés permiso para esta acción" });
        }
        next();
    };
}

module.exports = verificationRol;
