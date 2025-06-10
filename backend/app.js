const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conecWithDataBase = require("./config/conection"); // ← Importás la función de conexión

const productRoutes = require("./routes/ProductRoutes");
const saleRoutes = require("./routes/SaleRoutes");
const saleDetailsRoutes = require("./routes/saleDetails");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/product", productRoutes);

app.use("/sale", saleRoutes);

app.use("/saleDetails", saleDetailsRoutes);



// Conectás a Mongo y luego levantás el servidor
conecWithDataBase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
