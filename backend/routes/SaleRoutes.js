const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.post("/create", saleController.create);

router.get("/getAll", saleController.findAll);

router.get("/getSale", saleController.findSale);

router.delete("/delete", saleController.deleteSale);

router.put("/update", saleController.updateSale);

module.exports = router;
