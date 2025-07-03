const Product = require('../models/ProductModel');

const getAll = () => Product.find().populate('category');
const getById = id => Product.findById(id).populate('category');
const getProductsActive = () => Product.find({ active: true }).populate('category');
const getProductDetails = (id) => Product.findById(id).select('name price').lean();
const getByCategory = (category) => Product.find({ category, active: true }).populate('category');
const create = data => Product.create(data);
const update = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
const remove = id => Product.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove, getProductDetails, getByCategory, getProductsActive };