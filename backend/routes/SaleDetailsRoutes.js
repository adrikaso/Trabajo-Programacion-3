const express = require("express");
const router = express.Router();
const saleDetailsController = require("../controllers/saleDetailsController");

router.post("/create", saleDetailsController.create);

router.get("/getAll", saleDetailsController.findAll);

router.get("/getSaleDetails", saleDetailsController.findSaleDetails);

router.delete("/delete", saleDetailsController.deleteSaleDetails);

router.put("/update", saleDetailsController.updateSaleDetails);

module.exports = router;