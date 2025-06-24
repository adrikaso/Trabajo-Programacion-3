const jwt = require("jsonwebtoken");

// Supongamos que obtuviste el usuario desde MongoDB
const payload = {
    id: user._id,
    email: user.email,
    rol: user.rol // puede ser "admin", "cliente", etc.
};

const token = jwt.sign(payload, "clave_secreta", { expiresIn: "1h" });

res.json({ token });
