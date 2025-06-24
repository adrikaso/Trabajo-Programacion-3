
const services = require("../services/RolService");

async function findAll(req, res) {
    try {
        res.json(await services.getAllRols());
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        res.json(await services.createRol(req.body));
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getByName(req, res) {
    try {
        res.json(await services.getRolByName(req.params.name));
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {findAll, create, getByName};