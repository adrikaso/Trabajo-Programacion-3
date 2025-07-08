
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

async function getUserById(id, data) {
    return await repo.update(id, data);
}

async function getUserByEmail(email) {
    return await repo.getByEmail(email);
}

async function updateUserById(id, userUpdated) {
    const updatedData = { ...userUpdated };

    if (updatedData.password && updatedData.password.trim() !== '') {
        updatedData.password = bcrypt.hashSync(updatedData.password, 10);
    } else {
        // si el campo está vacio, elimina la propiedad password del objecto, asi no pisa la contraseña existente con un valor vacio
        delete updatedData.password;
    }
    return await repo.update(id, updatedData);
}

async function deleteUserById(id) {
    return await repo.remove(id);
}

module.exports = { createUser, getAllUsers,getUserByEmail, updateUserById, getUserById, deleteUserById };