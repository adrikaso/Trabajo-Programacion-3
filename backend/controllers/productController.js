const services = require("../services/ProductService");

const create = async (req, res) => {
  try {
    const product = await services.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const findAll = async (req, res) => {
  try {
    const list = await services.getAllProducts();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const findProduct = async (req, res) => {
  try {
    const product = await services.getProductById(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await services.deleteById(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await services.updateById(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { create, deleteProduct, findAll, findProduct, deleteProduct, updateProduct };







