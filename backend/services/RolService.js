const repo = require('../persistence/repositories/RolRepository');

async function createRol(data) {
    return await repo.create(data);
}

async function getAllRols() {
    return await repo.getAll();
}  

async function getRolById(id) {
    return await repo.getById(id);
}

async function deleteRolById(id) {
    return await repo.remove(id);
}

async function updateRolById(id, rolUpdated) {
    return await repo.update(id, rolUpdated);
}

module.exports = { createRol, getAllRols, getRolById, deleteRolById, updateRolById };