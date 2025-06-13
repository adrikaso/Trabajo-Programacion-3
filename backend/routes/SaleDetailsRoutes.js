const express = require("express");
const router = express.Router();
const saleDetailsController = require("../controllers/SaleDetailsController");

router.post("/create", saleDetailsController.create);

router.get("/getAll", saleDetailsController.findAll);

router.get("/getSaleDetails/:id", saleDetailsController.findSaleDetails);

router.delete("/delete/:id", saleDetailsController.deleteSaleDetails);

router.put("/update/:id", saleDetailsController.updateSaleDetails);

module.exports = router;