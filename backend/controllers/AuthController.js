const User = require("../persistence/repositories/UserRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getByEmail(email);
        console.log(user);

        if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        const isvalid = await bcrypt.compare(password, user.password);
        if (!isvalid) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

        const payload = {
        id: user._id,
        email: user.email,
        rol: user.rol.name
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
