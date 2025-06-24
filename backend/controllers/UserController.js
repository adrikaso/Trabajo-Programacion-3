const services = require("../services/UserService");

function createUser(req, res) {
    const data = req.body;
    services.createUser(data).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
}

function getAllUsers(req, res) {
    services.getAllUsers().then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
}

function getUserByEmail(req, res) {
    const email = req.params.email;
    services.getUserByEmail(email).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
}

module.exports = {createUser, getAllUsers, getUserByEmail};