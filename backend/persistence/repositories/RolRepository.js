const rolRepository = require('../models/RolModel');

const getAll = () => rolRepository.find();
const getById = id => rolRepository.findById(id);
const getByName = name => rolRepository.findOne({name});
const create = data => rolRepository.create(data);
const update = (id, data) => rolRepository.findByIdAndUpdate(id, data, { new: true });
const remove = id => rolRepository.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove, getByName };