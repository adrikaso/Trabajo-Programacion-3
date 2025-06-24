const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conecWithDataBase = require("./config/conection"); // ← Importás la función de conexión

const productRoutes = require("./routes/ProductRoutes");
const saleRoutes = require("./routes/SaleRoutes");
const saleDetailsRoutes = require("./routes/SaleDetailsRoutes");
const itemCartRoutes = require("./routes/ItemCartRoutes");
const shopingCartRoutes = require("./routes/ShopingCartRoutes");
const clientRoutes = require("./routes/ClientRoutes");
const rolRoutes = require("./routes/RolRoutes");
const userRoutes = require("./routes/UserRoutes");
const userLogRoutes = require("./routes/UserLogRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/user",userRoutes);

app.use("/product", productRoutes);

app.use("/sale", saleRoutes);

app.use("/saleDetails", saleDetailsRoutes);

app.use("/itemCart", itemCartRoutes);

app.use("/shopingCart", shopingCartRoutes)

app.use("/client", clientRoutes)

app.use("/rol", rolRoutes)

app.use("/userLog", userLogRoutes)

app.use("/auth", authRoutes)




// Conectás a Mongo y luego levantás el servidor
conecWithDataBase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});

// const productService = require("../backend/services/ProductService");

// console.log("Iniciando");

// const main = async () => {
//   const productos = await productService.getAllProducts();
//   console.log("Productos:", productos);
// };

// main();