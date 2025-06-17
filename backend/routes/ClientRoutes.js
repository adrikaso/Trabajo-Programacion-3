const express = require('express');
const router = express.Router();
const clientController = require("../controllers/ClientController");

router.get('/getAll', clientController.getAllClients);
router.post('/create', clientController.createClient);

module.exports = router;