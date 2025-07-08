const services = require("../services/SaleDetailsService");

const create = async (req, res) => {
    try {
        const saleDetails = await services.createSaleDetails(req.body);
        res.status(201).json(saleDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findAll = async (req, res) => {
    try {
        const list = await services.getAllSaleDetails();
        res.status(201).json(list);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findSaleDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const saleDetails = await services.getSaleDetailsById(id);
        res.status(201).json(saleDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteSaleDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const saleDetails = await services.deleteById(id);
        res.status(201).json(saleDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateSaleDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const saleDetails = await services.updateById(id, req.body);
        res.status(201).json(saleDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findSaleDetailsBySaleId = async (req, res) => {
    try {
        const { id } = req.params;
        const saleDetails = await services.getSaleDetailsBySaleId(id);
        res.status(201).json(saleDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getTopProducts = async (req, res) => {
    try {
        const topProducts = await services.getTopProducts();
        res.status(201).json(topProducts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { create, deleteSaleDetails, findAll, findSaleDetails, updateSaleDetails, findSaleDetailsBySaleId, getTopProducts };












