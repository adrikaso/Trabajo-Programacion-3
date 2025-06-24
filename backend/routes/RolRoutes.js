const express = require("express");
const router = express.Router();
const rolController = require("../controllers/RolController");

router.get("/getAll", rolController.findAll);

router.post("/create", rolController.create);



module.exports = router;
