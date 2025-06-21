
document.addEventListener('DOMContentLoaded', () => {
    const btnCrearCarrito = document.getElementById('btnCrearCarrito');
    const btnGetAllProducts = document.getElementById('btnGetAllProducts');

    btnCrearCarrito.addEventListener('click', crearCarrito);
    btnGetAllProducts.addEventListener('click', showProducts);

    // const btnTestUpdateItem = document.getElementById('btnTestUpdateItem');
    // const btnTestDeleteItem = document.getElementById('btnTestDeleteItem');
    // const btnTestCreateItem = document.getElementById('btnTestCreateItem');
    // const btnGetAllItems = document.getElementById('btnGetAllItems');
    
    //Sections
    const productSection = document.getElementById('productSection');
    const productList = document.getElementById('productList');
    const cartSection = document.getElementById('cartSection');
    const cartList = document.getElementById('cartList');
    const totalSpan = document.getElementById('totalPurchase');

    //Buttons
    const btnFinalizePurchase = document.getElementById('btnFinalizePurchase');
    const btnCancelPurchase = document.getElementById('btnCancelPurchase');

    cartSection.style.display = 'Block';

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

    //BOTON DE TRAER PRODUCTOS
    btnGetAllItems.addEventListener('click', testGetAllItems);
    //BOTON DE AGREGAR AL CARRITO
    btnTestCreateItem.addEventListener('click', addToCart);
    //BOTON DE ELIMINAR ITEM
    btnTestDeleteItem.addEventListener('click', testDeleteItem);
    //BOTON DE ACTUALIZAR ITEM
    // btnTestUpdateItem.addEventListener('click', testUpdateItem);
    //BOTON DE FINALIZAR COMPRA
    btnFinalizePurchase.addEventListener('click', FinalizePurchase);
    //BOTON DE CANCELAR COMPRA
    btnCancelPurchase.addEventListener('click', cancelPurchase);

    let productCart = [];




    //cliente

    const inputClientName = document.getElementById('inputClientName');


    async function FinalizePurchase() {
        if(productCart.length > 0){
            await testCreateClient();
            await testCreateSale();
            await testDeleteCart();
            await testDeleteAllItems();

            // Limpiar front
            productCart = [];
            cartList.innerHTML = '';
            totalSpan.textContent = '0';
            // resetInputs();

            ticketSection.style.display = 'block';
            productSection.style.display = 'none';
            cartSection.style.display = 'none';
            itemSection.style.display = 'none';
        }else{
            return;
        }

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

                // Estructura HTML sin el botón
                li.innerHTML = `
                <div class="d-flex align-items-center gap-3">
                    <img src="${product.imagen}" alt="${product.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                    <div>
                        <strong>${product.nombre}</strong><br>
                        <small>$${product.precio}</small>
                    </div>
                </div>
            `;

                // Crear botón
                const btn = document.createElement('button');
                btn.className = 'btn btn-sm btn-primary';
                btn.textContent = 'Agregar';

                // Agregar event listener
                btn.addEventListener('click', () => {
                    addItem(product._id, product.nombre, product.precio, product.imagen);
                });

                li.appendChild(btn);
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

    //FUNCION DE OBTENER CLIENTES
    // async function testGetAllClients() {
    //     try {
    //         const url = 'http://localhost:3000/client/getAll';
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         console.log('Clientes obtenidos:', data);
    //     } catch (error) {
    //         console.error('Error al obtener los clientes:', error);
    //     }
    // }

    async function crearCarrito() {
        try {
            await testDeleteCart();
            await testDeleteAllItems();
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

            productCart = [];
            cartList.innerHTML = '';
            ticketSection.style.display = 'none';
            cartSection.style.display = 'block';
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

        // // Función para obtener los valores de los inputs
    // function loadItemValues() {
    //     const itemValues = {
    //         productId: inputProductID.value.trim(),
    //         productName: inputProductName.value.trim(),
    //         unitPrice: inputUnitPrice.value.trim(),
    //         quantity: inputQuantity.value.trim()
    //     }
    //     return itemValues;
    // }

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

    async function testGetTotal() {
        try {
            const url = 'http://localhost:3000/shopingCart/getTotal';
            const response = await fetch(url);
            const data = await response.json();
            console.log('Total obtenido:', data);
            return data;
        } catch (error) {
            console.error('Error al obtener el total:', error);
        }
    }

    async function updateTotalSpan () {
        totalSpan.textContent = await testGetTotal();
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
            // resetInputs();
            return data;
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
                body: JSON.stringify({ quantity: itemValue })
            })
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al actualizar el item:', error);
        }
    }

    async function addToCart(productValues) {
        let item;
        const itemInCart = productCart.find(
            item => item.productId === productValues.productId
        );

        if (itemInCart) {
            item = await incrementQuantity(itemInCart.id);

            updateItemDOM(item);

        } else {
            item = await testCreateItem(productValues);

            productCart.push({
                id: item._id,
                productId: productValues.productId,
                productName: productValues.productName
            });
        }
        await updateTotalSpan();
        return item;
    }

    async function incrementQuantity(itemId) {
        try {
            const url = `http://localhost:3000/itemCart/incrementQuantity/${itemId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            // resetInputs();
            return data;
        } catch (error) {
            console.error('Error al actualizar el item:', error);
        }
    }

    function updateItemDOM(item) {
        const itemElement = document.getElementById(`item-${item._id}`);
        if (itemElement) {
            const input = itemElement.querySelector('input');
            if (input) {
                input.value = item.quantity;
            }
        }
    }

    async function testDeleteItem(itemId) {
        try {
            const url = `http://localhost:3000/itemCart/delete/${itemId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
        } catch (error) {
            console.error('Error al eliminar el item:', error);
        }
    }

    //TEST UPDATE PERO CON LOS VALORES DE INPUTS
    // async function testUpdateItem() {
    //     try {
    //         let id = inputItemID.value.trim();
    //         let items = loadItemValues();
    //         const url = `http://localhost:3000/itemCart/update/${id}`;
    //         const response = await fetch(url, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(items)
    //         });
    //         const data = await response.json();
    //         console.log('Item actualizado:', data);
    //         resetInputs();
    //     } catch (error) {
    //         console.error('Error al actualizar el item:', error);
    //     }
    // }

    // function resetInputs() {
    //     inputItemID.value = '';
    //     inputProductID.value = '';
    //     inputProductName.value = '';
    //     inputUnitPrice.value = '';
    //     inputQuantity.value = '';
    // }

    async function addItem(productID, productName, unitPrice, URLimg) {
        // inputProductID.value = productID;
        // inputProductName.value = productName;
        // inputUnitPrice.value = unitPrice;
        // inputQuantity.value = 1;
        const itemValues = {
            productId: productID.trim(),
            productName: productName.trim(),
            unitPrice: unitPrice,
            quantity: 1
        }
        // itemSection.style.display = 'block';
        const item = await addToCart(itemValues);

        console.log('Item agregado al carrito:', item._id);
        
        addItemToCart(item._id, productID, productName, unitPrice, URLimg, item.quantity);
    }

    async function addItemToCart(itemId, productID, productName, unitPrice, URLimg, quantity = 1) {
        const existingLi = document.getElementById(`item-${itemId}`);
        if (existingLi) {
            const input = existingLi.querySelector('input');
            if (input) input.value = quantity;
            return;
        }

        const li = document.createElement('li');
        li.id = `item-${itemId}`;
        li.className = 'list-group-item d-flex justify-content-between align-items-center bg-light text-dark mb-2 rounded';
        li.innerHTML = `
            <div class="d-flex align-items-center gap-3"> 
                <img src="${URLimg}" alt="${productName}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;"> 
                <div> 
                    <strong>${productName}</strong><br> 
                    <small>$${unitPrice}</small> 
                </div> 
            </div> 
            `;

        //boton de incrementar
        const btnIncr = document.createElement('button');
        btnIncr.className = 'btn btn-sm btn-primary';
        btnIncr.textContent = '+';
        btnIncr.addEventListener('click', async () => {
            inputQuantity.value++;
            await updateQuantity(inputQuantity.value, itemId);
            updateTotalSpan();
        });

        // input de cantidad
        const inputQuantity = document.createElement('input');
        inputQuantity.type = 'number';
        inputQuantity.min = '1';
        inputQuantity.value = 1;
        inputQuantity.addEventListener('input', async() => {
            await updateQuantity(inputQuantity.value, itemId);
            updateTotalSpan();
        });

        //boton de decrementar
        const btnDecr = document.createElement('button');
        btnDecr.className = 'btn btn-sm btn-primary';
        btnDecr.textContent = '-';
        btnDecr.addEventListener('click', async () => {
            if (inputQuantity.value > 1) {
                inputQuantity.value--;
                await updateQuantity(inputQuantity.value, itemId);
                updateTotalSpan();
            }
        });

        //boton de borrar del carrito
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn btn-sm btn-danger';
        btnDelete.textContent = 'X';
        btnDelete.addEventListener('click', async() => {
            const index = productCart.findIndex(item => item.id === itemId);
            if (index !== -1) {
                productCart.splice(index, 1);
                cartList.removeChild(li);
                await testDeleteItem(itemId);
                updateTotalSpan();
            }
        });
        li.appendChild(btnIncr);
        li.appendChild(inputQuantity);
        li.appendChild(btnDecr);
        li.appendChild(btnDelete);

        cartList.appendChild(li);
    }

    async function cancelPurchase() {
        if(productCart.length === 0) return;
        productCart = [];
        cartList.innerHTML = '';
        // resetInputs();
        testDeleteCart();
        testDeleteAllItems();
        totalSpan.textContent = '0';
        productSection.style.display = 'none';
        cartSection.style.display = 'none';
        itemSection.style.display = 'none';
        ticketSection.style.display = 'none';
    }

});