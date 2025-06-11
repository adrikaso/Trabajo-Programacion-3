const services = require("../services/SaleService");

const create = async (req, res) => {
  try {
    const sale = await services.createSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const findAll = async (req, res) => {
  try {
    const list = await services.getAllSales();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const findSale = async (req, res) => {
  try {
    const sale = await services.getSaleById(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteSale = async (req, res) => {
  try {
    const sale = await services.deleteSaleById(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateSale = async (req, res) => {
  try {
    const sale = await services.updateSaleById(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { create, findAll, findSale, deleteSale, updateSale };