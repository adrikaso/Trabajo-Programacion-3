const services = require("../services/SaleService");

const create = async (req, res) => {
  try {
    const sale = await services.createSale();
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
    const {id} = req.params;
    const sale = await services.getSaleById(id);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getTotalSales = async (req, res) => {
  try {
    const total = await services.getTotalSales();
    res.status(201).json(total);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getAverageSales = async (req, res) => {
  try {
    const average = await services.getAverageSales();
    res.status(201).json(average);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getSumTotalSales = async (req, res) => {
  try {
    const total = await services.getSumTotalSales();
    res.status(201).json(total);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await services.deleteSaleById(id);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await services.updateSaleById(id,req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = { create, findAll, findSale, deleteSale, updateSale, getTotalSales, getAverageSales, getSumTotalSales };