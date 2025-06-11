const mongoose = require("mongoose");

const conectWithDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = conectWithDataBase;
