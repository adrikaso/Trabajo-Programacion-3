const repo = require('../persistence/repositories/ClientRepository');
const shopingService = require('./ShopingCartService');

async function createClient() {
    const n = await shopingService.getName(); // { name: 'Adrián' }
    const name = n?.name ? n.name.toString() : null;

    if (!name) {
        throw new Error("Nombre inválido o no encontrado en ShopingCart.");
    }

    // Acá lo corregís: pasás un objeto con la propiedad name
    return await repo.create({ name }); // ✅
}

async function getAllClients() {
    return await repo.getAll();
}

async function getClientById(id) {
    return await repo.getById(id);
}

async function deleteClientById(id) {
    return await repo.remove(id);
}

async function updateClientById(id, clientUpdated) {
    return await repo.update(id, clientUpdated);
}

module.exports = { createClient, getAllClients, getClientById, deleteClientById, updateClientById };