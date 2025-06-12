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

    const btnCreateProduct = document.getElementById('btnCreateProduct');
    const btnGetAllProducts = document.getElementById('btnGetAllProducts');
    const btnGetProduct = document.getElementById('btnGetProduct');
    const btnTestCreateProduct = document.getElementById('btnTestCreateProduct');
    const btnTestUpdateProduct = document.getElementById('btnTestUpdateProduct');
    const btnTestDeleteProduct = document.getElementById('btnTestDeleteProduct');

    const nombreCliente = document.getElementById('inputClientName');
    const inputDate = document.getElementById('inputDate');
    const inputTotal = document.getElementById('inputTotal');
    const inputSaleID = document.getElementById('inputSaleID');

    const inputQuantity = document.getElementById('inputQuantity');
    const inputProduct = document.getElementById('inputProdID');
    const inputSubTotal = document.getElementById('inputSubTotal');
    const inputSaleDetailsID = document.getElementById('inputSaleDetailsID');

    btnTestCreateProduct.addEventListener('click', testCreateProduct);
    btnTestUpdateProduct.addEventListener('click', testUpdateProduct);
    btnTestDeleteProduct.addEventListener('click', testDeleteProduct);

    btnGetAllProducts.addEventListener('click', testGetAllProducts);
    btnGetProduct.addEventListener('click', testGetProduct);

    
    function loadProductValues() {
        const product = {
            nombre: productName.value,
            precio: price.value,
            imagen: img.value,
            categoria: category.value,
            activo: active.value
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
            let id = productID.value.trim(); // ✅ Asegura que no sea vacío
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


