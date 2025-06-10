const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarDB = require("./config/db"); // ← Importás la función de conexión

const productoRoutes = require("./rutas/productos");
const ventaRoutes = require("./rutas/ventas");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventaRoutes);

// Conectás a Mongo y luego levantás el servidor
conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
