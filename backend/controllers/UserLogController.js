const services = require("../services/UserLogService");

function createUserLog(req, res) {
    const userLog = req.body;
    services.createUserLog(userLog).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
}
module.exports = {createUserLog};