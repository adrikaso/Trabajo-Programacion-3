const express = require("express");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const conecWithDataBase = require("./config/conection"); 


const productRoutes = require("./routes/ProductRoutes");
const saleRoutes = require("./routes/SaleRoutes");
const saleDetailsRoutes = require("./routes/SaleDetailsRoutes");
const itemCartRoutes = require("./routes/ItemCartRoutes");
const shopingCartRoutes = require("./routes/ShopingCartRoutes");
const rolRoutes = require("./routes/RolRoutes");
const userRoutes = require("./routes/UserRoutes");
const userLogRoutes = require("./routes/UserLogRoutes");
const authRoutes = require("./routes/AuthRoutes");
const uploadRoutes = require("./routes/UploadRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas

app.use(express.static(path.join(__dirname, '../frontend')));

app.use("/user",userRoutes);

app.use("/product", productRoutes);

app.use("/sale", saleRoutes);

app.use("/saleDetails", saleDetailsRoutes);

app.use("/itemCart", itemCartRoutes);

app.use("/shopingCart", shopingCartRoutes)

app.use("/rol", rolRoutes)

app.use("/userLog", userLogRoutes)

app.use("/auth", authRoutes)

app.use("/", uploadRoutes)
app.use("/uploads", express.static("uploads")); 

app.use("/category", categoryRoutes)

// Conectás a Mongo y luego levantás el servidor
conecWithDataBase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
