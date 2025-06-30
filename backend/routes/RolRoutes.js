const express = require("express");
const router = express.Router();
const rolController = require("../controllers/RolController");

const verificationToken = require("../middlewares/VerificationToken");
const verificationRol = require("../middlewares/VerificationRol");

router.get("/getAll", verificationToken, verificationRol(["superAdmin"]), rolController.findAll);



router.post("/create", rolController.create);



module.exports = router;
