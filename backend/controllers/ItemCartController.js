const services = require("../services/ItemCartService");

const getAllItemCarts = async (req, res) => {
    const itemCarts = await services.getAllItemCarts();
    res.json(itemCarts);
};

//EN CREAR ME TIENE QUE LLEGAR EL ID DEL PRODUCTO, EL PRODUCTNAME, PRODUCT PRICE Y QUANTITY
const createItemCart = async (req, res) => {
    const { productId ,productName, unitPrice, quantity } = req.body;

    const itemCart = await services.createItemCart({ productId, productName, unitPrice, quantity });
    res.json(itemCart);
};

const updateItemCart = async (req, res) => {
    const { id } = req.params;
    const itemCart = await services.updateItemCart(id, req.body);
    res.json(itemCart);
};

const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const itemCart = await services.updateQuantity(id, req.body);
    res.json(itemCart);
}

const incrementQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const itemCart = await services.incremetQuantity(id);
        res.json(itemCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteItemCart = async (req, res) => {
    const { id } = req.params;
    const itemCart = await services.deleteItemCart(id);
    res.json(itemCart);
};

const deleteAllItemCarts = async (req, res) => {
    const itemCarts = await services.deleteAllItemCarts();
    res.json(itemCarts);
};

module.exports = { getAllItemCarts, incrementQuantity, createItemCart, updateItemCart, updateQuantity, deleteItemCart, deleteAllItemCarts };