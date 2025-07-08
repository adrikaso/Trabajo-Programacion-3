document.addEventListener('DOMContentLoaded', () => {

    // Atajos de teclados globales (Ctrl + Shift + A para ir al login)
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.key === "A") {
            window.location.href = 'login.html';
        }

        // Si el input está enfocado, permitir escritura normal y manejo con Enter o Escape
        if (document.activeElement === inputClientName) {
            if (event.key === 'Escape') {
                hideKeyboard();
                inputClientName.blur();
            } else if (event.key === 'Enter') {
                hideKeyboard();
            }

            return;
        }

        // Si el teclado virtual está abierto, permitir cerrarlo con Escape o Enter
        if (virtualKeyboard.classList.contains('show')) {
            if (event.key === 'Escape') {
                hideKeyboard();
            } else if (event.key === 'Enter') {
                hideKeyboard();
            }
        }
    });

    // Elementos del DOM
    const btnCreateCart = document.getElementById('btnCrearCarrito');
    const inputClientName = document.getElementById('inputClientName');
    const nameError = document.getElementById('nameError');
    const virtualKeyboard = document.getElementById('virtualKeyboard');
    const keyboardOverlay = document.getElementById('keyboardOverlay');
    const closeKeyboard = document.getElementById('closeKeyboard');
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const finishKeyboard = document.getElementById('finishKeyboard');
    let capsLock = false;

    // Captura del evento de clic en el botón "Crear Carrito"
    btnCreateCart.addEventListener('click', (e) => {
        e.preventDefault(); // Evita enviar el formulario (si hay uno)
        const name = inputClientName.value.trim();

        if (name === '') {
            inputClientName.classList.add('is-invalid');
            nameError.style.display = 'block';
        } else {
            inputClientName.classList.remove('is-invalid');
            nameError.style.display = 'none';

            createCart();
        }
    });

    // Mostrar teclado virtual al hacer clic en el input
    inputClientName.addEventListener('click', showKeyboard);

    // Cerrar teclado al hacer clic en la X
    closeKeyboard.addEventListener('click', hideKeyboard);

    // Cerrar teclado al hacer clic fuera del teclado (en el overlay)
    keyboardOverlay.addEventListener('click', function (e) {
        if (e.target === keyboardOverlay) {
            hideKeyboard();
        }
    });

    // Cerrar teclado al hacer clic en el botón "Listo"
    finishKeyboard.addEventListener('click', hideKeyboard);

    // Asignar funcionalidad a cada tecla virtual
    keyboardKeys.forEach(key => {
        key.addEventListener('click', handleKeyPress);
    });

    /**
    * Crea un nuevo carrito con el nombre del cliente.
    * Borra cualquier carrito e items previos antes de crear uno nuevo.
    */
    async function createCart() {
        const name = inputClientName.value.trim();

        if (!name) {
            alert("Por favor ingresá tu nombre");
            return;
        }

        try {
            await deleteCart(); // elimina carrito previo
            await deleteAllItems(); // elimina ítems previos

            const response = await fetch('http://localhost:3000/shopingCart/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, total: 0 })
            });

            const data = await response.json();
            console.log('Carrito creado:', data);

            // guardar datos en localStorage
            localStorage.setItem('cartId', data._id);
            localStorage.setItem('clientName', name);

            inputClientName.value = '';

            // Redirige a la página de productos
            window.location.href = 'products.html';

        } catch (error) {
            console.error('Error al crear el carrito:', error);
        }
    }

    /**
    * Elimina el carrito existente en el backend.
    */
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

    /**
    * Elimina todos los ítems del carrito en el backend.
    */
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

    // descomentar si queremos que aparezca el teclado automaticamente

    // setTimeout(() => {
    //     showKeyboard();
    // }, 500);

    /**
    * Muestra el teclado virtual en pantalla.
    */
    function showKeyboard() {
        virtualKeyboard.classList.add('show');
        keyboardOverlay.classList.add('show');
        // NO bloquear el scroll ni el input
        inputClientName.focus();
    }

    /**
    * Oculta el teclado virtual de la pantalla.
    */
    function hideKeyboard() {
        virtualKeyboard.classList.remove('show');
        keyboardOverlay.classList.remove('show');

        inputClientName.focus();
    }

    /**
    * Maneja la pulsación de teclas en el teclado virtual.
    * Actualiza el valor del input según la tecla presionada.
    */
    function handleKeyPress(e) {
        const key = e.target.getAttribute('data-key');
        let currentValue = inputClientName.value;

        switch (key) {
            case 'BACKSPACE':
                inputClientName.value = currentValue.slice(0, -1);
                break;
            case 'SPACE':
                inputClientName.value = currentValue + ' ';
                break;
            case 'CAPS':
                capsLock = !capsLock;
                updateCapsLock();
                break;
            default:
                if (key && key.length === 1) {
                    const letter = capsLock ? key.toUpperCase() : key.toLowerCase();
                    inputClientName.value = currentValue + letter;
                }
                break;
        }

        // Efecto visual al presionar una tecla
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }

    /**
    * Cambia el estado visual del botón Caps Lock y actualiza el texto de las teclas.
    */
    function updateCapsLock() {
        const capsKey = document.querySelector('[data-key="CAPS"]');
        if (capsLock) {
            capsKey.style.background = 'linear-gradient(145deg, #28a745, #20c997)';
            keyboardKeys.forEach(key => {
                const keyValue = key.getAttribute('data-key');
                if (keyValue && keyValue.length === 1 && keyValue !== 'Ñ') {
                    key.textContent = keyValue.toUpperCase();
                }
            });
        } else {
            capsKey.style.background = 'linear-gradient(145deg, #667eea, #764ba2)';
            keyboardKeys.forEach(key => {
                const keyValue = key.getAttribute('data-key');
                if (keyValue && keyValue.length === 1 && keyValue !== 'Ñ') {
                    key.textContent = keyValue.toLowerCase();
                }
            });
        }
    }

    // Inicializa el estado de las teclas al cargar
    updateCapsLock();
});
