const services = require("../services/UserLogService");

function createUserLog(req, res) {
    const userLog = req.body;
    services.createUserLog(userLog).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
}

function getAllUserLogs(req, res) {
    try {
        const userLogs = services.getAllUserLogs();
        res.status(200).send(userLogs);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getAllWithUser(req, res) {
    try {
        const userLogs = await services.getAllUserLogsWithUser();
        res.status(200).send(userLogs);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {createUserLog, getAllUserLogs, getAllWithUser};