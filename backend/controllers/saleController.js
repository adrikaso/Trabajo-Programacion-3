const Venta = require("../models/SaleModel");
const DetalleVenta = require("../models/SaleDetailsModel");


const services = require("../services/SaleService");

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













// exports.crearVenta = async (req, res) => {
//   try {
//     const { clienteNombre, carrito } = req.body;

//     const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

//     const venta = new Venta({ clienteNombre, total });
//     const ventaGuardada = await venta.save();

//     const detalles = carrito.map(item => ({
//       ventaId: ventaGuardada._id,
//       productoId: item._id,
//       cantidad: item.cantidad,
//       subtotal: item.precio * item.cantidad
//     }));

//     await DetalleVenta.insertMany(detalles);

//     res.status(201).json({ mensaje: "Venta registrada con éxito", ventaId: ventaGuardada._id });
//   } catch (error) {
//     console.error("Error al crear venta:", error);
//     res.status(500).json({ mensaje: "Error al registrar la venta", error });
//   }
// };
