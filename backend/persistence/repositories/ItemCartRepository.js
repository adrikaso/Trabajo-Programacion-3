const ItemCart = require('../models/ItemCartModel');

const getAll = () => ItemCart.find();
const getById = id => ItemCart.findById(id);
const create = data => ItemCart.create(data);
const update = (id, data) => ItemCart.findByIdAndUpdate(id, data, { new: true });
const updateQuantity = (id, data) => ItemCart.updateOne({ _id: id}, data);
const remove = id => ItemCart.findByIdAndDelete(id);
const removeAll = () => ItemCart.deleteMany();

module.exports = { getAll, getById, create, update, updateQuantity, remove, removeAll };