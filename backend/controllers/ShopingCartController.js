const services = require("../services/ShopingCartService");

const createShopingCart = async (req, res) => {
    const { name } = req.body;
    const { total } = req.body;
    
    try {
        console.log(name, total);
        const cart = await services.createShopingCart(name, total);

        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllShopingCarts = async (req, res) => {
    try {
        const list = await services.getAllShopingCarts();
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNameOfShoppingCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await services.getNameOfShoppingCart(id);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { createShopingCart, getAllShopingCarts, getNameOfShoppingCart };