let productCart = [];
let allProducts = [];



document.addEventListener('DOMContentLoaded', async () => {
    // Mostrar mensaje de bienvenida
    const clientName = localStorage.getItem('clientName') || 'Cliente';
    document.getElementById('welcomeMessage').innerHTML =
        `<i class="fas fa-user me-2"></i>Bienvenido/a, ${clientName}`;

    // Cargar productos
    await loadProducts();

    // Cargar productos del carrito desde el backend
    await loadCartItems();

    // Configurar filtros
    setupFilters();
});

async function loadProducts() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const productGrid = document.getElementById('productGrid');

    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/product/getAll');
        allProducts = await response.json();

        await new Promise(resolve => setTimeout(resolve, 500));

        displayProducts(allProducts);
        loadingSpinner.style.display = 'none';
    } catch (error) {
        console.error('Error al cargar productos:', error);
        loadingSpinner.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error al cargar productos. Verifica tu conexión.
                    </div>
                `;
    }
}

async function loadCartItems() {
    try {
        const response = await fetch('http://localhost:3000/itemCart/getAll');
        const items = await response.json();

        productCart = items.map(item => ({
            id: item._id,
            productId: item.productId,
            productName: item.productName,
            unitPrice: item.unitPrice,
            quantity: item.quantity
        }));
        showAddedToCartAnimation();
        updateCartCounter();

    } catch (error) {
        console.error('Error al cargar los items del carrito:', error);
    }
}

function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category.name || 'otros');

    card.innerHTML = `
                <img src="http://localhost:3000${product.pictureURL}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-price">$${product.price}</div>
                    <button class="btn btn-primary btn-add-cart w-100" 
                            onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.pictureURL}')">
                        <i class="fas fa-plus me-2"></i>Agregar al Carrito
                    </button>
                </div>
            `;

    return card;
}

async function addToCart(productId, productName, unitPrice, URLimg) {
    let item;
    let productValues = {
        productId: productId.trim(),
        productName: productName.trim(),
        unitPrice: unitPrice,
        quantity: 1
    }

    const itemInCart = productCart.find(
        item => item.productId === productValues.productId
    );




    if (itemInCart) {
        item = await incrementQuantity(itemInCart.id);
        console.log('Item incrementado en el carrito:', item._id);
        updateItemDOM(item);

    } else {
        item = await createItem(productValues);

        productCart.push({
            id: item._id,
            productId: productValues.productId,
            productName: productValues.productName
        });
    }
    //await updateTotalSpan();
    showAddedToCartAnimation();
    updateCartCounter();
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

async function createItem(itemValue) {
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



function updateCartCounter() {
    const totalQuantity = productCart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalQuantity;
}

function showAddedToCartAnimation() {
    const cartCounter = document.getElementById('cartCounter');
    cartCounter.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCounter.style.transform = 'scale(1)';
    }, 200);
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar botones activos
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrar productos
            const category = btn.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function goToCart() {
    if (productCart.length === 0) {
        alert('Tu carrito está vacío. Agrega algunos productos primero.');
        return;
    }
    window.location.href = 'cart.html';
}

function goHome() {
    if (confirm('¿Estás seguro que quieres volver al inicio? Se perderán los productos del carrito.')) {
        window.location.href = 'index.html';
    }
}

