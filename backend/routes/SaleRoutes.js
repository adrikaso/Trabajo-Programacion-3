const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.post("/create", saleController.create);

router.get("/getAll", saleController.findAll);

router.get("/getSale/:id", saleController.findSale);

router.delete("/delete/:id", saleController.deleteSale);

router.put("/update/:id", saleController.updateSale);

module.exports = router;
