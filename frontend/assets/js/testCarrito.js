document.addEventListener('DOMContentLoaded', () => {
    const btnCrearCarrito = document.getElementById('btnCrearCarrito');
    const btnGetAllProducts = document.getElementById('btnGetAllProducts');
    const btnCrearItem = document.getElementById('btnCrearItem');

    btnCrearCarrito.addEventListener('click', crearCarrito);
    btnGetAllProducts.addEventListener('click', testGetAllProducts);
    btnCrearItem.addEventListener('click', testCreateItem);

    const btnTestUpdateItem = document.getElementById('btnTestUpdateItem');
    const btnTestDeleteItem = document.getElementById('btnTestDeleteItem');
    const btnTestCreateItem = document.getElementById('btnTestCreateItem');

    const inputItemID = document.getElementById('inputItemID');
    const inputProductID = document.getElementById('inputProductID');
    const inputProductName = document.getElementById('inputProductName');
    const inputUnitPrice = document.getElementById('inputUnitPrice');
    const inputQuantity = document.getElementById('inputQuantity');
    const btnGetAllItems = document.getElementById('btnGetAllItems');

    btnGetAllItems.addEventListener('click', testGetAllItems);
    btnTestCreateItem.addEventListener('click', testCreateItem);
    btnTestDeleteItem.addEventListener('click', testDeleteItem);
    btnTestUpdateItem.addEventListener('click', testUpdateItem);

    //cliente
    const inputClientName = document.getElementById('inputClientName');
    const btnTestCreateClient = document.getElementById('btnTestCreateClient');
    const btnGetAllClients = document.getElementById('btnGetAllClients');

    btnTestCreateClient.addEventListener('click', testCreateClient);
    btnGetAllClients.addEventListener('click', testGetAllClients);

    //sale
    const btnCreateSale = document.getElementById('btnCreateSale');
    btnCreateSale.addEventListener('click', testCreateSale);


    async function testCreateSale() {
        try {
            const url = 'http://localhost:3000/sale/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log('Venta creada:', data);
        } catch (error) {
            console.error('Error al crear la venta:', error);
        }
    }

    async function testCreateClient() {
        try {
            const url = 'http://localhost:3000/client/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })  
            const data = await response.json();
            console.log('Cliente creado:', data);
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    }

    async function testGetAllClients() {
        try {
            const url = 'http://localhost:3000/client/getAll';
            const response = await fetch(url);
            const data = await response.json();
            console.log('Clientes obtenidos:', data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    }


    async function crearCarrito() {
        try {
            const url = 'http://localhost:3000/shopingCart/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: inputClientName.value.trim(),
                    total: 0
                }
                )
            })
            const data = await response.json();
            console.log('Carrito creado:', data);
        } catch (error) {
            console.error('Error al crear el carrito:', error);
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

    function loadItemValues(){
        const itemValues = {
            productId: inputProductID.value.trim(),
            productName: inputProductName.value.trim(),
            unitPrice: inputUnitPrice.value.trim(),
            quantity: inputQuantity.value.trim()
        }
        return itemValues;
    }

    async function testGetAllItems() {
        try {
            const url = 'http://localhost:3000/itemCart/getAll';
            const response = await fetch(url);
            const data = await response.json();
            console.log('Items obtenidos:', data);
        } catch (error) {
            console.error('Error al obtener los items:', error);
        }
    }

    async function testCreateItem() {
        try {
            let items = loadItemValues();
            const url = 'http://localhost:3000/itemCart/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            })
            const data = await response.json();
            console.log('Item creado:', data);
        } catch (error) {
            console.error('Error al crear el item:', error);
        }
    }

    async function testDeleteItem(){
        try {
            let id = inputItemID.value.trim();
            const url = `http://localhost:3000/itemCart/delete/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Item eliminado:', data);
        } catch (error) {
            console.error('Error al eliminar el item:', error);
        }
    }
    
    async function testUpdateItem(){
        try {
            let id = inputItemID.value.trim();
            let items = loadItemValues();
            const url = `http://localhost:3000/itemCart/update/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            });
            const data = await response.json();
            console.log('Item actualizado:', data);
        } catch (error) {
            console.error('Error al actualizar el item:', error);
        }
    }

});