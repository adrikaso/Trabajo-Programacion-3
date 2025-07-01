const categoryModel = require('../models/CategoryModel');

const getAll = () => categoryModel.find();
const getById = id => categoryModel.findById(id);
const getCategoryName = name => categoryModel.findOne({name});
const create = data => categoryModel.create(data);
const update = (id, data) => categoryModel.findByIdAndUpdate(id, data, { new: true });
const remove = id => categoryModel.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove, getCategoryName };