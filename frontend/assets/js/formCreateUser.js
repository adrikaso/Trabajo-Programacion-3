if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    const btnCreateUser = document.getElementById('btnCreateUser');
    btnCreateUser.addEventListener('click', newUser);

    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('emailCreate');
    const inputPassword = document.getElementById('passwordCreate');

    const btnBack = document.getElementById('btnBack');
    btnBack.addEventListener('click', () => {
        window.location.href = 'menuAdmin.html';
    });

    await renderRols();

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

    async function newUser(event) {
        event.preventDefault();
        const selectedRoles = Array.from(document.querySelectorAll('input[name="roles"]:checked')).map(checkbox => checkbox.value);
        if (selectedRoles.length === 0) {
            alert('Debes seleccionar al menos un rol');
            return;
        }

        const rolList = await getRolIds(selectedRoles);

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

    async function getRolIds(rolNames) {
        const roles = await Promise.all(rolNames.map(async (rolName) => {
            const rol = await findRolByName(rolName);
            return rol._id;
        }));
        return roles;
    }

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

    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('emailCreate').value = '';
        document.getElementById('passwordCreate').value = '';
        document.getElementById('roleCheckboxContainer').innerHTML = '';
        renderRols();
    }

    
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