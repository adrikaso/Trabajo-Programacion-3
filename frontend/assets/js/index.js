document.addEventListener('DOMContentLoaded', () => {
    const btnCreateCart = document.getElementById('btnCrearCarrito');
    const inputClientName = document.getElementById('inputClientName');

    btnCreateCart.addEventListener('click', createCart);

    async function createCart() {
        const name = inputClientName.value.trim();

        if (!name) {
            alert("Por favor ingresá tu nombre");
            return;
        }

        try {
            await deleteCart();
            await deleteAllItems();

            const response = await fetch('http://localhost:3000/shopingCart/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, total: 0 })
            });

            const data = await response.json();
            console.log('Carrito creado:', data);

            localStorage.setItem('cartId', data._id);
            localStorage.setItem('clientName', name);

            inputClientName.value = '';

            window.location.href = '/TU SUPLEMENTO 1.1/frontend/products.html';

        } catch (error) {
            console.error('Error al crear el carrito:', error);
        }
    }


    async function deleteCart() {
        try {
            await fetch('http://localhost:3000/shopingCart/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    }

    async function deleteAllItems() {
        try {
            await fetch('http://localhost:3000/itemCart/deleteAll', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Error al eliminar los items:', error);
        }
    }
});
