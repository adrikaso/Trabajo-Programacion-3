const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

const verificationToken = require('../middlewares/VerificationToken');
const verificationRol = require('../middlewares/VerificationRol');

router.post("/create", saleController.create);

router.get("/getAll", saleController.findAll);

router.get("/getSale/:id", saleController.findSale);

router.get("/getTotalSales", verificationToken, verificationRol(["superAdmin"]), saleController.getTotalSales);

router.get("/getAverageSales", verificationToken, verificationRol(["superAdmin"]), saleController.getAverageSales);

router.get("/getSumTotalSales", verificationToken, verificationRol(["superAdmin"]), saleController.getSumTotalSales);

router.delete("/delete/:id", saleController.deleteSale);

router.put("/update/:id", saleController.updateSale);



module.exports = router;
