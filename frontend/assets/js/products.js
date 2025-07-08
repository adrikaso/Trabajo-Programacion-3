/* Variables globales */
let productCart = [];
let allProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Mostrar mensaje de bienvenida con su respectivo nombre
    const clientName = localStorage.getItem('clientName') || 'Cliente';
    document.getElementById('welcomeMessage').innerHTML =
        `<i class="fas fa-user me-2"></i>Bienvenido/a, ${clientName}`;

    // Cargar productos
    await loadProducts();

    // Cargar productos del carrito desde el backend
    await loadCartItems();
    console.log("cart cargado:" + productCart);
    // Cargar categorias
    loadCategoryFilters();
});

/* ----------------getters---------------- */

/* Obtiene todos los productos desde el backend */
async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:3000/product/getAll');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}
/* Obtiene solo los productos activos (disponibles) */
async function getProductsActive() {
    try {
        const response = await fetch('http://localhost:3000/product/getProductsActive');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener los productos activos:', error);
        return [];
    }
}

/* Obtiene todas las categorias */
async function getAllCategories() {
    try {
        const response = await fetch("http://localhost:3000/category/getAll");
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}

/* Obtiene los productos por categoría */
async function getProductsByCategory(categoryId) {
    try {
        const response = await fetch(`http://localhost:3000/product/category/${categoryId}`);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error al cargar productos por categoría:", error);
    }
}

/* ----------------Funciones de carga y renderizado---------------- */ 

/* Carga los productos activos y los muestra */
async function loadProducts() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    try {
        const allProducts = await getProductsActive();

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

/* Muestra los productos en el DOM */
function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    initializeProductButtons();
}

/* Crea una tarjeta visual de producto para el DOM */ 
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category.name.toLowerCase());

    card.innerHTML = `
                <img src="http://localhost:3000${product.pictureURL}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-price">$${product.price}</div>
                    <button class="btn btn-primary btn-add-cart w-100" 
                            onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.pictureURL}')">
                        <i class="fas fa-plus me-2"></i>Agregar al Carrito
                    </button>

                    <div class="quantity-controls-product" style="display: none;">
                        <button class="quantity-btn" onclick="decrementQuantityProduct('${product._id}')">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display" id="quantity-${product._id}">1</span>
                        <button class="quantity-btn" onclick="incrementQuantityProduct('${product._id}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>

                    <button class="btn btn-primary btn-remove-cart w-100" 
                        onclick="removeFromCart('${product._id}')"
                        style="display: none;">
                        <i class="fas fa-trash me-2"></i>Eliminar del Carrito
                    </button>
                </div>
            `;

    return card;
}

/* Carga los productos actuales del carrito desde el backend */
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
        initializeProductButtons();
    } catch (error) {
        console.error('Error al cargar los items del carrito:', error);
    }
}

// Cargar las categorias y sus respectivos botones para filtrar
async function loadCategoryFilters() {
    const container = document.getElementById("category-filters");

    try {
        const categorias = await getAllCategories();

        // boton todos
        const allBtn = document.createElement("button");
        allBtn.className = "filter-btn active";
        allBtn.textContent = "Todos";
        allBtn.addEventListener("click", async () => {
            setActiveButton(allBtn);
            const products = await getProductsActive();
            displayProducts(products);
            
        });
        container.appendChild(allBtn);

        // bbotones dinamicos por categoría
        categorias.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "filter-btn";
            btn.textContent = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
            btn.addEventListener("click", async () => {
                setActiveButton(btn);
                const productos = await getProductsByCategory(cat._id);
                displayProducts(productos);
            });
            container.appendChild(btn);
        });
        initializeProductButtons();
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}

/* -----------------Funciones de logica del carrito---------------- */

/* Agrega un producto al carrito */
async function addToCart(productId, productName, unitPrice, URLimg) {
    let item;
    let productValues = {
        productId: productId.trim(),
        productName: productName.trim(),
        unitPrice: unitPrice,
        quantity: 1
    }

    const itemInCart = productCart.find(
        item => {
            const itemProductId = typeof item.productId === 'object' ? item.productId._id : item.productId;
            return itemProductId === productValues.productId;
        }
    );

    if (itemInCart) {
        item = await incrementQuantity(itemInCart.id);
        console.log('Item incrementado en el carrito:', item._id);
        const cartIndex = productCart.findIndex(cartItem => cartItem.id === itemInCart.id);
        if (cartIndex !== -1) {
            productCart[cartIndex].quantity = item.quantity;
        }
        updateItemDOM(item);

    } else {
        item = await createItem(productValues);

        productCart.push({
            id: item._id,
            productId: productValues.productId,
            productName: productValues.productName,
            quantity: item.quantity
        });
    }
    showQuantityControls(productId);
    updateQuantityDisplay(productId, item.quantity);
    
    return item;
}

/* Elimina un producto del carrito y lo actualiza visualmente */
async function removeFromCart(productId) {
    try {
        const itemInCart = productCart.find(
            item => {
                const itemProductId = typeof item.productId === 'object' ? item.productId._id : item.productId;
                return itemProductId === productId;
            }
        );

        if (itemInCart) {
            await fetch(`http://localhost:3000/itemCart/delete/${itemInCart.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            // Remover del array local
            productCart = productCart.filter(item => item.id !== itemInCart.id);
            
            // Ocultar botón de eliminar
            hideQuantityControls(productId);

            await loadCartItems();
        }
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
    }
}

/* 
 * Estas dos funciones incrementan y decrementan la cantidad de productos del carrito 
 */
async function incrementQuantityProduct(productId) {
    const itemInCart = productCart.find(item => {
        const itemProductId = typeof item.productId === 'object' ? item.productId._id : item.productId;
        return itemProductId === productId;
    });

    if (itemInCart) {
        try {
            const updatedItem = await incrementQuantity(itemInCart.id);
            // Actualizar la cantidad en el array local
            const cartIndex = productCart.findIndex(item => item.id === itemInCart.id);
            if (cartIndex !== -1) {
                productCart[cartIndex].quantity = updatedItem.quantity;
            }
            updateQuantityDisplay(productId, updatedItem.quantity);
        } catch (error) {
            console.error('Error al incrementar cantidad:', error);
        }
    }
}
async function decrementQuantityProduct(productId) {
    const itemInCart = productCart.find(item => {
        const itemProductId = typeof item.productId === 'object' ? item.productId._id : item.productId;
        return itemProductId === productId;
    });

    if (itemInCart && itemInCart.quantity > 1) {
        try {
            const newQuantity = itemInCart.quantity - 1;

            await fetch(`http://localhost:3000/itemCart/updateQuantity/${itemInCart.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQuantity})
            });
            
            // Actualizar la cantidad en el array local
            const cartIndex = productCart.findIndex(item => item.id === itemInCart.id);
            if (cartIndex !== -1) {
                productCart[cartIndex].quantity = newQuantity;
            }
            updateQuantityDisplay(productId, newQuantity);
        } catch (error) {
            console.error('Error al decrementar cantidad:', error);
        }
    }
}

/* Crea un nuevo item en el carrito en el backend */
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

/* Llama al backend para incrementar la cantidad de un item */
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

/**
 * Elimina el carrito completo del backend
 */
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

/**
 * Elimina todos los ítems del carrito
 */
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

/*---------------------- Funciones auxiliares o de UI ---------------------- */

/* Muestra los controles de cantidad en productos que ya están en el carrito */ 
function showQuantityControls(productId) {
    const addButton = document.querySelector(`button[onclick*="addToCart('${productId}'"]`);
    if (addButton) {
        const productCard = addButton.closest('.product-card');
        const quantityControls = productCard.querySelector('.quantity-controls-product');
        const removeButton = productCard.querySelector('.btn-remove-cart');
        
        if (quantityControls && removeButton) {
            addButton.style.display = 'none';
            quantityControls.style.display = 'flex';
            removeButton.style.display = 'inline-block';
        }
    }
}
function hideQuantityControls(productId) {
    const addButton = document.querySelector(`button[onclick*="addToCart('${productId}'"]`);
    if (addButton) {
        const productCard = addButton.closest('.product-card');
        const quantityControls = productCard.querySelector('.quantity-controls-product');
        const removeButton = productCard.querySelector('.btn-remove-cart');
        
        if (quantityControls && removeButton) {
            addButton.style.display = 'inline-block';
            quantityControls.style.display = 'none';
            removeButton.style.display = 'none';
        }
    }
}
function updateQuantityDisplay(productId, quantity) {
    const quantityDisplay = document.getElementById(`quantity-${productId}`);
    if (quantityDisplay) {
        quantityDisplay.textContent = quantity;
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
function initializeProductButtons() {
    productCart.forEach(item => {
        const itemProductId = typeof item.productId === 'object' ? item.productId._id : item.productId;
        showQuantityControls(itemProductId);
        updateQuantityDisplay(itemProductId, item.quantity);
    });
}

function setActiveButton(activeBtn) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

/* -------- funciones de navegacion -------- */
function goToCart() {
    window.location.href = 'cart.html';
}

function goHome() {
    deleteAllItemCart();
    deleteCart();
    window.location.href = 'index.html';
}