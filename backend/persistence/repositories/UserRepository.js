
const User = require('../models/UserModel');

const getAll = () => User.find();
const getById = id => User.findById(id);
const getByEmail = email => User.findOne({ email }).populate("rol");;
const create = data => User.create(data);
const update = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
const remove = id => User.findByIdAndDelete(id);

module.exports = { getAll, getById,getByEmail, create, update, remove };