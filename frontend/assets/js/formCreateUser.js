// Si no hay token en el localStorage, redirige al login (seguridad de acceso)
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

// Ejecuta el código una vez que el DOM esté cargado
document.addEventListener('DOMContentLoaded', async () => {
    const btnCreateUser = document.getElementById('btnCreateUser');
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('emailCreate');
    const inputPassword = document.getElementById('passwordCreate');
    const btnBack = document.getElementById('btnBack');

    createThemeToggleButton();
    function toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);

        // Guardar preferencia en localStorage
        localStorage.setItem('theme', newTheme);

        // Actualizar el icono del botón
        updateThemeIcon(newTheme);
    }

    // Función para actualizar el icono del botón
    function updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.title = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        }
    }

    // Función para inicializar el tema
    function initializeTheme() {
        const body = document.body;

        // Obtener tema guardado o usar preferencia del sistema
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        // Aplicar tema
        body.setAttribute('data-theme', theme);

        // Actualizar icono
        updateThemeIcon(theme);
    }

    // Función para crear el botón de cambio de tema
    function createThemeToggleButton() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.onclick = toggleTheme;

        // Añadir el botón al body
        document.body.appendChild(themeToggle);

        // Inicializar el tema
        initializeTheme();
    }

    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const theme = e.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', theme);
            updateThemeIcon(theme);
        }
    });

    // Evento para crear nuevo usuario
    btnCreateUser.addEventListener('click', newUser);

    // Evento para volver al menú del admin
    btnBack.addEventListener('click', () => {
        window.location.href = 'menuAdmin.html';
    });

    // Renderiza los roles disponibles como checkboxes
    await renderRols();

    /**
     * Envia los datos de un nuevo usuario al backend para su creación
     * @param {Object} userData - Objeto con name, email, password, date, rol[], active
     * @returns {Object} Usuario creado (respuesta del backend)
     */
    async function createUser(userData) {
        try {
            const response = await fetch('http://localhost:3000/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    /**
     * Handler del botón "Crear Usuario".
     * Recolecta los datos del formulario, valida roles y envía el usuario al backend.
     */
    async function newUser(event) {
        event.preventDefault();

        // Obtener los roles seleccionados
        const selectedRoles = Array.from(document.querySelectorAll('input[name="roles"]:checked')).map(checkbox => checkbox.value);
        if (selectedRoles.length === 0) {
            alert('Debes seleccionar al menos un rol');
            return;
        }

        // Obtener IDs reales de los roles seleccionados
        const rolList = await getRolIds(selectedRoles);

        // Armar objeto con los datos del nuevo usuario
        const userData = {
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value,

            date: new Date().toISOString(),
            rol: rolList,
            active: true
        };
        console.log(userData);
        await createUser(userData);
        await createUserLog('Ha creado el usuario ' + userData.name);
        clearForm();
    }

    /**
     * Dado un array de nombres de roles, obtiene sus respectivos IDs del backend
     * @param {string[]} rolNames - Nombres de los roles seleccionados
     * @returns {Promise<string[]>} - Array de IDs de roles
     */
    async function getRolIds(rolNames) {
        const roles = await Promise.all(rolNames.map(async (rolName) => {
            const rol = await findRolByName(rolName);
            return rol._id;
        }));
        return roles;
    }

    /**
     * Obtiene todos los roles existentes desde el backend
     * @returns {Promise<Object[]>} - Array de roles
     */
    async function getAllRols() {
        try {
            let token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/rol/getAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error showing roles:', error);
            throw error;
        }
    }

    /**
     * Busca un rol por su nombre y retorna su objeto completo desde el backend
     * @param {string} rolName - Nombre del rol (ej: "admin")
     * @returns {Promise<Object>} - Objeto del rol
     */
    async function findRolByName(rolName) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/rol/getByName/${rolName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error finding rol by name:', error);
            throw error;
        }
    }

    /**
     * Renderiza los roles obtenidos como checkboxes dentro del contenedor
     */
    async function renderRols() {
        try {
            const roles = await getAllRols();
            const container = document.getElementById('roleCheckboxContainer');
            container.innerHTML = ""; // Limpia contenido anterior

            roles.forEach(role => {
                const div = document.createElement('div');
                div.classList.add('form-check');

                div.innerHTML = `
                <input class="form-check-input" type="checkbox" name="roles" value="${role.name}" id="rol-${role.name}">
                <label class="form-check-label" for="rol-${role.name}">
                    ${role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                </label>
            `;

                container.appendChild(div);
            });
        } catch (error) {
            console.error('Error al renderizar roles:', error);
        }
    }

    /**
     * Limpia el formulario y vuelve a renderizar los roles
     */
    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('emailCreate').value = '';
        document.getElementById('passwordCreate').value = '';
        document.getElementById('roleCheckboxContainer').innerHTML = '';
        renderRols();
    }


    /**
     * Crea un log de acción para registrar que se creó un nuevo usuario
     * @param {string} action - Descripción de la acción (ej: "Ha creado el usuario X")
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
});