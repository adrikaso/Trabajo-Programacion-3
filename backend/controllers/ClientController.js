const services = require("../services/ClientService");

const createClient = async (req, res) => {
    try {
        const client = await services.createClient();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

const getAllClients = async (req, res) => {
    try {
        const clients = await services.getAllClients();
        res.status(201).json(clients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createClient, getAllClients };