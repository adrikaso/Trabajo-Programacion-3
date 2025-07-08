const services = require("../services/CategoryService");

const getAllCategories = async (req, res) => {
    try {
        const categories = await services.getAllCategories();
        res.status(201).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAllCategories };