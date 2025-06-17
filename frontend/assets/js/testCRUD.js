document.addEventListener('DOMContentLoaded', () => {
    // admin.js
    const API_URL = 'http://localhost:3000/product';

    const formProduct = document.getElementById('formProductc');
    const formSale = document.getElementById('formSale');
    const formSaleDetails = document.getElementById('formSaleDetails');

    //Products
    const productName = document.getElementById('name');
    const price = document.getElementById('price');
    const img = document.getElementById('img');
    const category = document.getElementById('category');
    const active = document.getElementById('active');
    const productID = document.getElementById('hijodemilputa');

    const btnGetAllProducts = document.getElementById('btnGetAllProducts');
    const btnGetProduct = document.getElementById('btnGetProduct');
    const btnTestCreateProduct = document.getElementById('btnTestCreateProduct');
    const btnTestUpdateProduct = document.getElementById('btnTestUpdateProduct');
    const btnTestDeleteProduct = document.getElementById('btnTestDeleteProduct');

    btnGetAllProducts.addEventListener('click', testGetAllProducts);
    btnGetProduct.addEventListener('click', testGetProduct);
    btnTestCreateProduct.addEventListener('click', testCreateProduct);
    btnTestUpdateProduct.addEventListener('click', testUpdateProduct);
    btnTestDeleteProduct.addEventListener('click', testDeleteProduct);

    //Sales
    const inputClient = document.getElementById('inputClientName');
    const inputDate = document.getElementById('inputDate');
    const inputTotal = document.getElementById('inputTotal');
    const inputSaleID = document.getElementById('inputSaleID');
;
    const btnGetAllSales = document.getElementById('btnGetAllSales');
    const btnGetSale = document.getElementById('btnGetSale');
    const btnTestCreateSale = document.getElementById('btnTestCreateSale');
    const btnTestUpdateSale = document.getElementById('btnTestUpdateSale');
    const btnTestDeleteSale = document.getElementById('btnTestDeleteSale');

    btnTestCreateSale.addEventListener('click', testCreateSale);
    btnGetAllSales.addEventListener('click', testGetAllSales);
    btnGetSale.addEventListener('click', testGetSale);
    btnTestUpdateSale.addEventListener('click', testUpdateSale);
    btnTestDeleteSale.addEventListener('click', testDeleteSale);
    


    //SaleDetails
    const IDinputSale = document.getElementById('IDinputSale');
    const inputQuantity = document.getElementById('inputQuantity');
    const inputProdIDdetails = document.getElementById('inputProdIDdetails');
    const inputSubTotal = document.getElementById('inputSubTotal');
    const inputSaleDetailsID = document.getElementById('inputSaleDetailsID');

    const btnGetAllSalesDetails = document.getElementById('btnGetAllSalesDetails');
    const btnGetSaleDetail = document.getElementById('btnGetSaleDetail');
    const btnTestCreateSaleDetail = document.getElementById('btnTestCreateSaleDetail');
    const btnTestUpdateSaleDetail = document.getElementById('btnTestUpdateSaleDetail');
    const btnTestDeleteSaleDetail = document.getElementById('btnTestDeleteSaleDetail');

    btnGetAllSalesDetails.addEventListener('click', testGetAllSaleDetails);
    btnGetSaleDetail.addEventListener('click', testGetSaleDetails);
    btnTestCreateSaleDetail.addEventListener('click', testCreateSaleDetails);
    btnTestUpdateSaleDetail.addEventListener('click', testUpdateSaleDetails);
    btnTestDeleteSaleDetail.addEventListener('click', testDeleteSaleDetails);

    //----------------SaleDetails-------------------

    function loadSaleDetailsValues() {
        const saleDetails = {
            ventaId: IDinputSale.value,
            cantidad: inputQuantity.value,
            productoId: inputProdIDdetails.value,
            subtotal: inputSubTotal.value
        };
        console.log(saleDetails);
        return saleDetails;
    }

    async function testGetAllSaleDetails() {
        try {

            const url = 'http://localhost:3000/saleDetails/getAll';
            const response = await fetch(url);
            const data = await response.json();
            console.log('Ventas obtenidas:', data);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    }

    async function testGetSaleDetails() {
        try {
            let id = inputSaleDetailsID.value.trim();
            const url = `http://localhost:3000/saleDetails/getSaleDetails/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log('Venta obtenida:', data);
        } catch (error) {
            console.error('Error al obtener la venta:', error);
        }
    }

    async function testCreateSaleDetails() {
        try {
            let saleDetails = loadSaleDetailsValues();
            const url = 'http://localhost:3000/saleDetails/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleDetails)
            });
            const data = await response.json();
            console.log('Venta creada:', data);
        } catch (error) {
            console.error('Error al crear la venta:', error);
        }
    }

    async function testUpdateSaleDetails() {
        try {
            const id = inputSaleDetailsID.value.trim();
            let saleDetails = loadSaleDetailsValues();
            const url = `http://localhost:3000/saleDetails/update/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleDetails)
            });
            const data = await response.json();
            console.log('Venta actualizada:', data);
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
        }
    }

    async function testDeleteSaleDetails() {
        try {
            let id = inputSaleDetailsID.value.trim();
            const url = `http://localhost:3000/saleDetails/delete/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Venta eliminada:', data);
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
        }
    }

    //----------------Sales-------------------
    
    function loadSaleValues() {
        const sale = {
            clienteNombre: inputClient.value,
            fecha: inputDate.value,
            total: inputTotal.value
        };
        console.log(sale);
        return sale;
    }

    async function testGetAllSales() {
        try {
            const url = 'http://localhost:3000/sale/getAll';
            const response = await fetch(url);
            const data = await response.json();
            console.log('Ventas obtenidas:', data);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    }

    async function testGetSale() {
        try {
            let id = inputSaleID.value.trim();
            const url = `http://localhost:3000/sale/getSale/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log('Venta obtenida:', data);
        } catch (error) {
            console.error('Error al obtener la venta:', error);
        }
    }

    async function testCreateSale() {
        try {
            let sale = loadSaleValues();
            const url = 'http://localhost:3000/sale/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    sale
                )
            });

            const data = await response.json();
            console.log('Venta creada:', data);
        } catch (error) {
            console.error('Error al crear la venta:', error);
        }
    }

    async function testUpdateSale() {
        try {
            const id = inputSaleID.value.trim();
            let sale = loadSaleValues();
            const url = `http://localhost:3000/sale/update/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    sale
                )
            });
            const data = await response.json();
            console.log('Venta actualizada:', data);
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
        }
    }

    async function testDeleteSale() {
        try {
            let id = inputSaleID.value.trim();
            const url = `http://localhost:3000/sale/delete/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Venta eliminada:', data);
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
        }
    }

    //--------------- Products-------------------
    function loadProductValues() {
        const product = {
            name: productName.value,
            price: price.value,
            pictureURL: img.value,
            category: category.value,
            active: active.value
        };
        return product;
    }

    async function testCreateProduct() {
        try {
            let product = loadProductValues();
            const url = 'http://localhost:3000/product/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    product
                )
            });

            const data = await response.json();
            console.log('Producto creado:', data);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    }

    async function testUpdateProduct() {
        try {
            const id = productID.value.trim();
            let product = loadProductValues();
            const url = `http://localhost:3000/product/update/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    product
                )
            });

            const data = await response.json();
            console.log('Producto actualizado:', data);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    }

    async function testDeleteProduct() {
        try {
            let id = productID.value.trim();
            const url = `http://localhost:3000/product/delete/${id}`;
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log('Producto eliminado:', data);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }

    async function testGetAllProducts() {
        try {
            const url = 'http://localhost:3000/product/getAll';
            const response = await fetch(url);
            const data = await response.json();
            console.log('Productos obtenidos:', data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }

    async function testGetProduct() {
        try {
            let id = productID.value.trim(); // 
            if (!id) {
                alert("el id es " + id);
                return;
            }

            const url = `http://localhost:3000/product/getProduct/${id}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error("Producto no encontrado");

            const data = await response.json();
            console.log("Producto obtenido:", data);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    }


});


