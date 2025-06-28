const Product = require('../models/ProductModel');

const getAll = () => Product.find();
const getById = id => Product.findById(id);
const getProductDetails = (id) => Product.findById(id).select('nombre precio').lean();; 
const create = data => Product.create(data);
const update = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
const remove = id => Product.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove, getProductDetails };