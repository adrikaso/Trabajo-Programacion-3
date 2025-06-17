const ItemCart = require('../models/ItemCartModel');

const getAll = () => ItemCart.find();
const getById = id => ItemCart.findById(id);
const create = data => ItemCart.create(data);
const update = (id, data) => ItemCart.findByIdAndUpdate(id, data, { new: true });
const remove = id => ItemCart.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove };