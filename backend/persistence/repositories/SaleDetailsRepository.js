const SaleDetails = require('../models/SaleDetailsModel');

const getAll = () => SaleDetails.find();
const getById = id => SaleDetails.findById(id);
const create = data => SaleDetails.create(data);
const update = (id, data) => SaleDetails.findByIdAndUpdate(id, data, { new: true });
const remove = id => SaleDetails.findByIdAndDelete(id);
const getBySaleId = (saleId) => SaleDetails.find({ saleId }).populate('productId');
const getTopProducts = () => SaleDetails.aggregate([
                            {
                                $group: {
                                _id: "$productId",
                                totalVendidas: { $sum: "$quantity" }
                                }
                            },
                            {
                                $sort: { totalVendidas: -1 }
                            },
                            {
                                $limit: 3
                            },
                            {
                                $lookup: {
                                from: "products", // nombre real de la colección en MongoDB
                                localField: "_id", // el productId
                                foreignField: "_id", // el _id en products
                                as: "producto"
                                }
                            },
                            {
                                $unwind: "$producto"
                            },
                            {
                                $project: {
                                _id: 0,
                                name: "$producto.name",
                                totalVendidas: 1
                                }
                            }
                            ]);

module.exports = { getAll, getById, create, update, remove, getBySaleId, getTopProducts };