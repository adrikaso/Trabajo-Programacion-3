const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const verificationToken = require("../middlewares/VerificationToken");
const verificationRol = require("../middlewares/VerificationRol");

router.get("/getAll", productController.findAll);

router.post("/create", productController.create);

router.get("/getProduct/:id", productController.findProduct);

router.get("/category/:categoryId", productController.getByCategory);

router.delete("/delete/:id", productController.deleteProduct);

router.get("/getProductDetails/:id", productController.getProductDetails);

router.put("/update/:id", productController.updateProduct);

module.exports = router;
