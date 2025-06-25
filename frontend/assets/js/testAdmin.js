document.addEventListener('DOMContentLoaded', () => {
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const form = document.getElementById('loginForm');
    const btnRoles = document.getElementById('btnRoles');
    const btnShowRoles = document.getElementById('btnShowRoles');
    const btnLogin= document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');

    btnLogin.addEventListener('click', validateCredentials);
    btnRoles.addEventListener('click', createRoles);
    btnShowRoles.addEventListener('click', showRoles);
    btnLogout.addEventListener('click', logout);

    let token = localStorage.getItem('token');

    const userRegister={
        _id: null,
        name: null,
        email: null,
        password:null,
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

    async function newUser() {
        const userData = {
            name: "admin",
            email: "admin@example.com",
            password:"admin123",
            date: new Date().toISOString(),
            rol: ["685983724fa7cfaedc0cfafa"],
            products: [],
            sales: []
        };
        await createUser(userData);
        return;
    }

    async function createRoles(){
        const roleList = ["admin", "superAdmin" ,"user"];
        for(let rol of roleList){
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
        // const credentials=await getByEmail(email);
        const credentials=await authenticateUser(email,password);
        console.log(credentials);
        localStorage.setItem('token',credentials.token);
    }

    async function logout() {
        await createUserLog(userRegister._id,"logout");
    }

    async function createUserLog(userId,action){
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
});