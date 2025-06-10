const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/saleController");

router.post("/", ventaController.crearVenta);

module.exports = router;
