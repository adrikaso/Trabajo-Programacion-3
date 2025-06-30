document.addEventListener('DOMContentLoaded', () => {

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const form = document.getElementById('loginForm');
    const btnRoles = document.getElementById('btnRoles');
    const btnShowRoles = document.getElementById('btnShowRoles');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');

    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('emailCreate');
    const inputPassword = document.getElementById('passwordCreate');

    const btnCreateUser = document.getElementById('btnCreateUser');



    btnLogin.addEventListener('click', validateCredentials);
    btnRoles.addEventListener('click', createRoles);
    btnShowRoles.addEventListener('click', showRoles);
    btnLogout.addEventListener('click', logout);
    btnCreateUser.addEventListener('click', newUser);


    let userRegister = {
        _id: null,
        name: null,
        email: null,
        password: null,
        date: null,
        rol: [],
        products: [],
        sales: []
    };

    async function createUser(userData) {
        try {
            const response = await fetch('http://localhost:3000/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        if(selectedRoles.length === 0) {
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
            products: [],
            sales: []
        };
        console.log(userData);
        await createUser(userData);
        
    }

    async function getRolIds(rolNames) {
        const roles = await Promise.all(rolNames.map(async (rolName) => {
            const rol = await findRolByName(rolName);
            return rol._id;
        }));
        return roles;
    }

    async function createRoles() {
        const roleList = ["admin", "superAdmin", "user"];
        for (let rol of roleList) {
            await createRole(rol);
        }
    }

    async function createRole(rol) {
        try {
            const response = await fetch('http://localhost:3000/rol/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: rol }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating role:', error);
            throw error;
        }
    }

    async function showRoles() {
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

            return data;
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }

    async function validateCredentials() {
        const email = emailInput.value;
        const password = passwordInput.value;
        let credentials = await authenticateUser(email, password);

        console.log(credentials);
        localStorage.setItem('token', credentials.token);

        if (credentials != null) {
            console.log(credentials);
            console.log("entor la balubi")
            let user = await getByEmail(email);
            userRegister = user;
        
            await createUserLog(user._id, "login");
            window.location.href = 'menuAdmin.html';
        }

    }

    async function logout() {
        if (userRegister.name != null) {
            localStorage.removeItem('token');
            await createUserLog(userRegister._id, "logout");
            userRegister = null;
            console.log("Logout exitoso");
            clearForm();
        }
    }

    async function createUserLog(userId, action) {
        try {
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

    async function findRolByName(rolName) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/rol/getRol/${rolName}`, {
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
    function clearForm() {
        emailInput.value = '';
        passwordInput.value = '';
    }
});