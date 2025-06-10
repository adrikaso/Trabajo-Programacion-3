const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productController");

router.get("/allProducts", productoController.getProductos);

router.post("/", productoController.crearProducto);

module.exports = router;
