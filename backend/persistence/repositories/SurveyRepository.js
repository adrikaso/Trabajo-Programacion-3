const SaleDetails = require('../models/SurveyModel');

const getAll = () => SaleDetails.find();
const getById = id => SaleDetails.findById(id);
const create = data => SaleDetails.create(data);
const update = (id, data) => SaleDetails.findByIdAndUpdate(id, data, { new: true });
const remove = id => SaleDetails.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove };