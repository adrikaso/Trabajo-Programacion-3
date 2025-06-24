const userLog = require('../models/UserLogModel');

const getAll = () => userLog.find();
const getById = id => userLog.findById(id);
const create = data => userLog.create(data);
const update = (id, data) => userLog.findByIdAndUpdate(id, data, { new: true });
const remove = id => userLog.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove };