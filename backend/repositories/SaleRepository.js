const Sale = require('../models/SaleModel');

const getAll = () => Sale.find();
const getById = id => Sale.findById(id);
const create = data => Sale.create(data);
const update = (id, data) => Sale.findByIdAndUpdate(id, data, { new: true });
const remove = id => Sale.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove };