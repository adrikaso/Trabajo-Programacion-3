
const repo = require('../persistence/repositories/UserRepository');
const bcrypt = require("bcryptjs");

async function createUser(data) {
    const salt = await bcrypt.genSalt(10); 
    data.password = await bcrypt.hash(data.password, salt);
    return await repo.create(data);
}

async function getAllUsers() {
    return await repo.getAll();
}

async function getUserById(id) {
    return await repo.getById(id);
}

async function getUserByEmail(email) {
    return await repo.getByEmail(email);
}

async function updateUserById(id, userUpdated) {
    return await repo.update(id, userUpdated);
}

async function deleteUserById(id) {
    return await repo.remove(id);
}

module.exports = { createUser, getAllUsers,getUserByEmail, updateUserById, getUserById, deleteUserById };