const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/getAll", productController.findAll);

router.post("/create", productController.create);

router.get("/getProduct/:id", productController.findProduct);

router.delete("/delete/:id", productController.deleteProduct);

router.get("/getProductDetails/:id", productController.getProductDetails);

router.put("/update/:id", productController.updateProduct);

module.exports = router;
