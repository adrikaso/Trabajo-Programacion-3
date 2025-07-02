const express = require("express");
const router = express.Router();
const saleDetailsController = require("../controllers/SaleDetailsController");

const verificationToken = require('../middlewares/VerificationToken');
const verificationRol = require('../middlewares/VerificationRol');

router.post("/create", saleDetailsController.create);

router.get("/getAll", saleDetailsController.findAll);

router.get("/getSaleDetails/:id", saleDetailsController.findSaleDetails);

router.get("/getSaleDetailsBySaleId/:id", saleDetailsController.findSaleDetailsBySaleId);

router.get("/getTopProducts", verificationToken, verificationRol(["superAdmin"]), saleDetailsController.getTopProducts);

router.delete("/delete/:id", saleDetailsController.deleteSaleDetails);

router.put("/update/:id", saleDetailsController.updateSaleDetails);

module.exports = router;