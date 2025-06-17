const ShopingCart = require('../models/ShopingCartModel');

const getId = () => ShopingCart.findOne().select('_id');
const getName = () => ShopingCart.findOne().select('name');
const getTotal = () => ShopingCart.findOne().select('total');
const getAll = () => ShopingCart.find();
const getById = id => ShopingCart.findById(id);
const create = data => ShopingCart.create(data);
const update = (id, data) => ShopingCart.findByIdAndUpdate(id, data, { new: true });
const remove = id => ShopingCart.findByIdAndDelete(id);

module.exports = {getTotal, getName, getId, getAll, getById, create, update, remove };