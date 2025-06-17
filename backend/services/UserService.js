const repo = require('../persistence/repositories/UserRepository');

async function createUser(data) {
    return await repo.create(data);
}

async function getAllUsers() {
    return await repo.getAll();
}

async function getUserById(id) {
    return await repo.getById(id);
}

async function updateUserById(id, userUpdated) {
    return await repo.update(id, userUpdated);
}

async function deleteUserById(id) {
    return await repo.remove(id);
}

module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };