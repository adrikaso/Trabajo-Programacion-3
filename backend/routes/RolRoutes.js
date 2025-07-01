const express = require("express");
const router = express.Router();
const rolController = require("../controllers/RolController");

const verificationToken = require("../middlewares/VerificationToken");
const verificationRol = require("../middlewares/VerificationRol");

router.get("/getAll", verificationToken, verificationRol(["superAdmin"]), rolController.findAll);


router.get("/getByName/:name", verificationToken, rolController.getByName);

>>>>>>> 4ba5b89ad8df7ad0a53526f8723c25721dabb4f0
router.post("/create", rolController.create);



module.exports = router;
