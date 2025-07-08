const repo = require('../persistence/repositories/SaleRepository');
const shopingService = require('./ShopingCartService');
const saleDetailsService = require('./SaleDetailsService');



async function createSale() {
	const total = (await shopingService.getTotal()).total;
	const clientName = (await shopingService.getName()).name;
	const date = new Date();
	const sale = await repo.create({ clientName, date, total });
	await saleDetailsService.createSaleDetails(sale.id);
	return sale;
	}

async function getAllSales() {
	return await repo.getAll();
}

async function getTotalSales() {
	return await repo.getTotalSales();
}

async function getAverageSales() {
	return await repo.getAverageSales();
}

async function getSumTotalSales() {
	return await repo.getSumTotalSales();
}

async function getSaleById(id) {
    return await repo.getById(id);
}

async function deleteSaleById(id){
    return await repo.remove(id);
}

async function updateSaleById(id, saleUpdated) {
    return await repo.update(id, saleUpdated);
}



module.exports = { createSale, getAllSales, getSaleById, deleteSaleById, updateSaleById, getTotalSales, getAverageSales, getSumTotalSales };