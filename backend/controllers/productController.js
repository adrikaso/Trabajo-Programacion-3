const { get } = require("mongoose");
const services = require("../services/ProductService");

const create = async (req, res) => {
  try {
    const pictureURL = req.body.pictureURL;
    
    const productData = {
      ...req.body,
      pictureURL,
    };

    const product = await services.createProduct(productData);
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
    const { id } = req.params; 
    const product = await services.getProductById(id); 
    if (!product) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByCategory = async (req, res) => {
  try{
    const { categoryId } = req.params;
    const products = await services.getProductsByCategory(categoryId);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await services.deleteById(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await services.updateById(id, req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await services.getProductDetails(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { create, deleteProduct, findAll, findProduct, deleteProduct, updateProduct, getProductDetails, getByCategory };