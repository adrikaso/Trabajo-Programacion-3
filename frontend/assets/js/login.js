// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    /* Lógica para alternar entre temas oscuro y claro (DARKMODE)*/
    // Crea el botón de cambio de tema y lo configura
    createThemeToggleButton();

    function createThemeToggleButton() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle btn btn-outline-secondary position-absolute top-0 end-0 m-3';
        themeToggle.style.zIndex = '1000'; // Asegura que esté encima de todo
        themeToggle.title = 'Cambiar a modo oscuro';
        themeToggle.onclick = toggleTheme;

        document.body.appendChild(themeToggle);

        initializeTheme();
    }

    // Cambia entre modo claro y oscuro
    function toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    // Aplica el tema guardado o el modo claro por defecto
    function initializeTheme() {
        const body = document.body;
        const savedTheme = localStorage.getItem('theme');
        const theme = savedTheme || 'light'; // Siempre arranca en light si no hay guardado

        body.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    // Cambia el icono del botón según el tema
    function updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.title = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        }
    }

    // Elementos del formulario
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnLogin = document.getElementById('btnLogin');

    // Botón para autocompletar datos de un super admin (solo para pruebas)
    const btnLoginSuper = document.getElementById('btnLoginSuper');
    btnLoginSuper.addEventListener('click', () => {
        emailInput.value = 'admin@example.com';
        passwordInput.value = 'admin123';
    })

    // Botón para autocompletar datos de otro admin (solo para pruebas)
    const btnLoginAdmin = document.getElementById('btnLoginAdmin');
    btnLoginAdmin.addEventListener('click', () => {
        emailInput.value = 'admin3@example.com';
        passwordInput.value = 'admin123';
    })

    // Evento principal de login
    btnLogin.addEventListener('click', validateCredentials);

    /**
     * Trae un usuario desde la base de datos por su email
     * @param {string} email - Email del usuario a buscar
     * @returns {Promise<Object>} - Objeto usuario
     */
    async function getByEmail(email) {
        try {
            const response = await fetch(`http://localhost:3000/user/getUser/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw error;
        }

    }

    /**
     * Autentica al usuario enviando email y contraseña al backend
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Object>} - Datos del usuario autenticado (token, etc.)
     */
    async function authenticateUser(email, password) {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Credenciales inválidas');
            }

            return data;
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }

    /**
     * Valida las credenciales ingresadas, guarda el token y redirige si es exitoso
     */
    async function validateCredentials() {
        const email = emailInput.value;
        const password = passwordInput.value;

        loginError.style.display = 'none';
        if (!validateEmailPassword(email, password)) return;

        try {
            const credentials = await authenticateUser(email, password);
            const user = await getByEmail(email);

            localStorage.setItem('userId', user._id);
            localStorage.setItem('token', credentials.token);
            await createUserLog("login");
            window.location.href = 'menuAdmin.html';

        } catch (err) {
            showInvalidCredentials();
        }

    }

    /**
     * Crea un log de actividad del usuario
     * @param {string} action - Acción realizada (ej: "login", "logout", etc.)
     * @returns {Promise<Object>}
     */
    async function createUserLog(action) {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch('http://localhost:3000/userLog/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, action: action, date: new Date().toISOString() }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating user log:', error);
            throw error;
        }
    }


    // Efectos de loading para los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // solo aplicar loading si no es un botón de tipo submit
            if (this.type !== 'submit') {
                this.classList.add('btn-loading');
                const originalText = this.textContent;
                this.textContent = 'Procesando...';

                setTimeout(() => {
                    this.classList.remove('btn-loading');
                    this.textContent = originalText;
                }, 2000);
            }
        });
    });

    // Efecto de escritura para los placeholders
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach((input, index) => {
        const originalPlaceholder = input.placeholder;
        input.placeholder = '';

        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                input.placeholder += originalPlaceholder[i];
                i++;
                if (i >= originalPlaceholder.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 1000 + (index * 500));
    });

    /* Validación de email y contraseña visual */
    function validateEmailPassword(email, password) {
        let isValid = true;

        emailInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');

        if (email === '') {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }

        if (password === '') {
            passwordInput.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    function showInvalidCredentials() {
        loginError.style.display = 'block';
    }

});