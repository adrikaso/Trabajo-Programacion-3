
function verificationRol(rolsRequired) {
    return (req, res, next) => {
        console.log("rol recibido:", req.user.rol);
        console.log("rol requerido:", rolsRequired);

        for (const rol of req.user.rol) {
            console.log("comparando", rol, "con", rolsRequired);
            if (rolsRequired.includes(rol)) {
                return next(); 
            }
        }

        return res.status(403).json({ mensaje: "No tenés permiso para esta acción" });
    };
}

module.exports = verificationRol;
