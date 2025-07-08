const multer = require("multer");
const path = require("path");


// 3. Configura el "storage" donde y como se guarad
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 3.1. Carpeta donde se guardan los archivos subidos
    },
    filename: function (req, file, cb) {
        // 3.2. le da un nombre unico al archivo usando la fecha y un numero random
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // extrae la extensión (.jpg, .png, etc.)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Ej: picture-12345.jpg
    }
});

//4 Crea el middleware usando esa configuracion
const upload = multer({ storage: storage });

module.exports = upload;