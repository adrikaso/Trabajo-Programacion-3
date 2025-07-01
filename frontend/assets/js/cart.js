let cartItems = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadCartItems();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('btnFinalizePurchase').addEventListener('click', finalizePurchase);
    document.getElementById('btnCancelPurchase').addEventListener('click', cancelPurchase);
}

async function loadCartItems() {
    const loadingCart = document.getElementById('loadingCart');
    const cartContent = document.getElementById('cartContent');

    try {
        const response = await fetch('http://localhost:3000/itemCart/getAll');
        cartItems = await response.json();

        loadingCart.style.display = 'none';
        cartContent.style.display = 'block';

        if (cartItems.length === 0) {
            document.getElementById('cartItems').innerHTML = '';
            showEmptyCart();
        } else {
            displayCartItems();
            await updateTotal();
        }

    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        loadingCart.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error al cargar el carrito
                    </div>
                `;
    }
}

function showEmptyCart() {
    document.getElementById('emptyCart').style.display = 'block';
    document.getElementById('totalSection').style.display = 'none';
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });

    updateItemCount();
}

function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.id = `item-${item._id}`;

    div.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="http://localhost:3000${item.productId.pictureURL}" 
                             alt="${item.productName}" class="item-image">
                    </div>
                    <div class="col-md-4">
                        <div class="item-info">
                            <h6>${item.productName}</h6>
                            <div class="item-price">${item.unitPrice}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="decrementQuantity('${item._id}')">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity-input" value="${item.quantity}" 
                                   min="1" onchange="updateQuantity('${item._id}', this.value)">
                            <button class="quantity-btn" onclick="incrementQuantity('${item._id}')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <div class="fw-bold mb-2">${(item.unitPrice * item.quantity).toFixed(2)}</div>
                        <button class="delete-btn" onclick="removeItem('${item._id}')" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

    return div;
}

async function incrementQuantity(itemId) {
    try {
        await fetch(`http://localhost:3000/itemCart/incrementQuantity/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });

        await loadCartItems();
    } catch (error) {
        console.error('Error al incrementar cantidad:', error);
    }
}

async function decrementQuantity(itemId) {
    const item = cartItems.find(i => i._id === itemId);
    if (item && item.quantity > 1) {
        try {
            await fetch(`http://localhost:3000/itemCart/updateQuantity/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: item.quantity - 1 })
            });

            await loadCartItems();
        } catch (error) {
            console.error('Error al decrementar cantidad:', error);
        }
    }
}

async function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return;

    try {
        await fetch(`http://localhost:3000/itemCart/updateQuantity/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: parseInt(newQuantity) })
        });

        await loadCartItems();
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
    }
}

async function removeItem(itemId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        try {
            await fetch(`http://localhost:3000/itemCart/delete/${itemId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            await loadCartItems();

            if (cartItems.length === 0) {
                showEmptyCart();
                document.getElementById('cartItems').innerHTML = '';

            }
            console.log(`Eliminando item ${itemId}`);
        } catch (error) {
            console.error('Error al eliminar item:', error);
        }
    }
}

async function updateTotal() {
    try {
        const response = await fetch('http://localhost:3000/shopingCart/getTotal');
        const total = await response.json();
        document.getElementById('totalAmount').textContent = `${total}`;
    } catch (error) {
        console.error('Error al obtener el total:', error);
    }
}

function updateItemCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('itemCount').textContent = `${totalItems} items`;
}


// METODOS CRUD
async function createClient() {
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

async function createSale() {
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
        return data._id;
    } catch (error) {
        console.error('Error al crear la venta:', error);
    }
}

async function deleteCart() {
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

async function deleteAllItemCart() {
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

async function finalizePurchase() {
    if (cartItems.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const confirmPurchase = confirm('¿Confirmas tu compra?');
    if (!confirmPurchase) return;

    try {
        // Mostrar loading
        const btn = document.getElementById('btnFinalizePurchase');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Procesando...';
        btn.disabled = true;

        // Crear cliente
        await createClient();

        // Crear venta
        const saleId = await createSale();

        // Limpiar carrito
        await deleteCart();

        // Eliminar items del carrito
        await deleteAllItemCart();

        // Redirigir al ticket
        window.location.href = `ticket.html?saleId=${saleId}`;

    } catch (error) {
        console.error('Error al finalizar compra:', error);
        alert('Error al procesar la compra. Intenta nuevamente.');

        const btn = document.getElementById('btnFinalizePurchase');
        btn.innerHTML = '<i class="fas fa-credit-card me-2"></i>Finalizar Compra';
        btn.disabled = false;
    }
}

async function cancelPurchase() {
    const confirmCancel = confirm('¿Estás seguro de que quieres cancelar tu pedido? Se perderán todos los productos del carrito.');
    if (!confirmCancel) return;

    try {
        deleteCart();

        deleteAllItemCart();

        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error al cancelar pedido:', error);
        alert('Error al cancelar el pedido');
    }
}

function goBack() {
    window.location.href = 'products.html';
}