document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.key === "A") {
            window.location.href = 'login.html';
        }

        // si el input esta enfocado permitir escritura normal
        if (document.activeElement === inputClientName) {
            if (event.key === 'Escape') {
                hideKeyboard();
                inputClientName.blur();
            } else if (event.key === 'Enter') {
                hideKeyboard();
            }

            return;
        }

        // si el teclado virtual esta abierto
        if (virtualKeyboard.classList.contains('show')) {
            if (event.key === 'Escape') {
                hideKeyboard();
            } else if (event.key === 'Enter') {
                hideKeyboard();
            }
        }

    });

    const btnCreateCart = document.getElementById('btnCrearCarrito');
    const inputClientName = document.getElementById('inputClientName');

    btnCreateCart.addEventListener('click', createCart);

    const virtualKeyboard = document.getElementById('virtualKeyboard');
    const keyboardOverlay = document.getElementById('keyboardOverlay');
    const closeKeyboard = document.getElementById('closeKeyboard');
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const finishKeyboard = document.getElementById('finishKeyboard');
    let capsLock = false;

    // Mostrar teclado cuando se hace clic en el input
    inputClientName.addEventListener('click', showKeyboard);

    // Cerrar teclado
    closeKeyboard.addEventListener('click', hideKeyboard);

    // Permitir cerrar el teclado haciendo click en el overlay
    keyboardOverlay.addEventListener('click', function (e) {
        if (e.target === keyboardOverlay) {
            hideKeyboard();
        }
    });
    finishKeyboard.addEventListener('click', hideKeyboard);

    // Funcionalidad de las teclas
    keyboardKeys.forEach(key => {
        key.addEventListener('click', handleKeyPress);
    });


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

            window.location.href = 'products.html';

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

    // descomentar si queremos que aparezca el teclado automaticamente

    // setTimeout(() => {
    //     showKeyboard();
    // }, 500);

    function showKeyboard() {
        virtualKeyboard.classList.add('show');
        keyboardOverlay.classList.add('show');
        // NO bloquear el scroll ni el input
        inputClientName.focus();
    }

    function hideKeyboard() {
        virtualKeyboard.classList.remove('show');
        keyboardOverlay.classList.remove('show');

        inputClientName.focus();
    }




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

        // Efecto visual en la tecla
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }

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
    updateCapsLock();

});
