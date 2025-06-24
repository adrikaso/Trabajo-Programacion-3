
function verificationRol(rolRequired) {
    return (req, res, next) => {
    if (req.user.rol !== rolRequired) {
        return res.status(403).json({ mensaje: "No tenés permiso para esta acción" });
    }
    next();
    };
}
