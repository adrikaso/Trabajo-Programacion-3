const repo = require('../persistence/repositories/UserLogRepository');

async function createUserLog(data) {
    return await repo.create(data);
}

async function getAllUserLogs() {
    return await repo.getAll();
}

async function getAllUserLogsWithUser() {
    const userLogs = await repo.getAllWithUsers();
    return userLogs;
}

async function getUserLogById(id) {
    return await repo.getById(id);
}

async function updateUserLogById(id, userLogUpdated) {
    return await repo.update(id, userLogUpdated);
}

async function deleteUserLogById(id) {
    return await repo.remove(id);
}

module.exports = { createUserLog, getAllUserLogs, getUserLogById, updateUserLogById, deleteUserLogById, getAllUserLogsWithUser };
