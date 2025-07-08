const ShopingCart = require('../models/ShopingCartModel');

const getId = () => ShopingCart.findOne().select('_id');
const getName = () => ShopingCart.findOne().select('name');
const getTotal = () => ShopingCart.findOne().select('total -_id');
const getAll = () => ShopingCart.find();
const getById = id => ShopingCart.findById(id);
const create = data => ShopingCart.create(data);
const update = (id, data) => ShopingCart.findByIdAndUpdate(id, data, { new: true });
const remove = id => ShopingCart.findByIdAndDelete(id);
const removeAll = () => ShopingCart.deleteMany();
const updateTotal = (id, data) => ShopingCart.updateOne({ _id: id}, data, { new: true });

module.exports = {getTotal, getName, getId, getAll, getById, create, update, remove, removeAll, updateTotal};