const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/getAll", productController.findAll);

router.post("/create", productController.create);

router.get("/getProduct", productController.findProduct);

router.delete("/delete", productController.deleteProduct);

router.put("/update", productController.updateProduct);

module.exports = router;
