document.addEventListener('DOMContentLoaded', () => {
    const btnCrearCarrito = document.getElementById('btnCrearCarrito');
    const btnGetAllProducts = document.getElementById('btnGetAllProducts');

    btnCrearCarrito.addEventListener('click', crearCarrito);
    btnGetAllProducts.addEventListener('click', showProducts);

    const btnTestUpdateItem = document.getElementById('btnTestUpdateItem');
    const btnTestDeleteItem = document.getElementById('btnTestDeleteItem');
    const btnTestCreateItem = document.getElementById('btnTestCreateItem');
    const btnGetAllItems = document.getElementById('btnGetAllItems');
    const btnFinalizePurchase = document.getElementById('btnFinalizePurchase');

    //Sections
    const productSection = document.getElementById('productSection');
    const productList = document.getElementById('productList');

    const cartSection = document.getElementById('cartSection');
    const cartList = document.getElementById('cartList');
    cartSection.style.display = 'none';

    const itemSection = document.getElementById('itemSection');
    itemSection.style.display = 'none';

    const ticketSection = document.getElementById('ticketSection');
    ticketSection.style.display = 'none';

    //items
    const inputItemID = document.getElementById('inputItemID');
    const inputProductID = document.getElementById('inputProductID');
    const inputProductName = document.getElementById('inputProductName');
    const inputUnitPrice = document.getElementById('inputUnitPrice');
    const inputQuantity = document.getElementById('inputQuantity');

    btnGetAllItems.addEventListener('click', testGetAllItems);
    btnTestCreateItem.addEventListener('click', addToCart);
    btnTestDeleteItem.addEventListener('click', testDeleteItem);
    btnTestUpdateItem.addEventListener('click', testUpdateItem);
    btnFinalizePurchase.addEventListener('click', FinalizePurchase);

    let productCart = [];




    //cliente

    const inputClientName = document.getElementById('inputClientName');


    async function FinalizePurchase() {
        testCreateClient();
        testCreateSale();
        ticketSection.style.display = 'block';
        productSection.style.display = 'none';
        cartSection.style.display = 'none';
        itemSection.style.display = 'none';
    }

    async function testDeleteCart() {
        try {
            const url = 'http://localhost:3000/shopingCart/delete';
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Carrito vaciado:', data);
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    }

    async function testDeleteAllItems() {
        try {
            const url = 'http://localhost:3000/itemCart/deleteAll';
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Items eliminados:', data);
        } catch (error) {
            console.error('Error al eliminar los items:', error);
        }
    }

    async function showProducts() {
        productSection.style.display = 'block';
        productList.innerHTML = '';
        try {
            const list = await testGetAllProducts();

            list.forEach(product => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center bg-light text-dark mb-2 rounded';

                li.innerHTML = `
                <div class="d-flex align-items-center gap-3">
                    <img src="${product.imagen}" alt="${product.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                    <div>
                        <strong>${product.nombre}</strong><br>
                        <small>$${product.precio}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-primary" onclick="agregarAlCarrito('${product._id}', '${product.nombre}', ${product.precio})">
                    Agregar
                </button>
            `;

                productList.appendChild(li);
            });
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }

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
            testDeleteCart();
            testDeleteAllItems();
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
            inputClientName.value = '';
            itemSection.style.display = 'block';
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
            return data;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }

    function loadItemValues() {
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

    async function testCreateItem(itemValue) {
        try {
            const url = 'http://localhost:3000/itemCart/create';


            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemValue)
            })
            const data = await response.json();

            const item = {
                id: data._id,
                productId: itemValue.productId,
                productName: itemValue.productName
            }
            productCart.push(item);

            console.log('Item creado:', data);
            resetInputs();
        } catch (error) {
            console.error('Error al crear el item:', error);
        }
    }

    async function updateQuantity(itemValue, itemId) {
        try {

            const url = `http://localhost:3000/itemCart/updateQuantity/${itemId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({quantity : itemValue.quantity})
            })
            const data = await response.json();
            console.log('Item actualizado:', data);
        } catch (error) {
            console.error('Error al actualizar el item:', error);
        }
    }

    async function addToCart() {
        let productValues = loadItemValues();
        const itemInCart = productCart.find(
            item => item.productId === productValues.productId
        );

        if (itemInCart) {
            updateQuantity(productValues, itemInCart.id);
        } else {
            testCreateItem(productValues);
        }
    }



    async function testDeleteItem() {
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
            resetInputs();
        } catch (error) {
            console.error('Error al eliminar el item:', error);
        }
    }

    async function testUpdateItem() {
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
            resetInputs();
        } catch (error) {
            console.error('Error al actualizar el item:', error);
        }
    }

    function resetInputs() {
        inputItemID.value = '';
        inputProductID.value = '';
        inputProductName.value = '';
        inputUnitPrice.value = '';
        inputQuantity.value = '';
    }

});

function agregarAlCarrito(productID, productName, unitPrice) {
    inputProductID.value = productID;
    inputProductName.value = productName;
    inputUnitPrice.value = unitPrice;
    inputQuantity.value = 1;
    itemSection.style.display = 'block';
}


