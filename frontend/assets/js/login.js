document.addEventListener('DOMContentLoaded', () => {

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnLogin = document.getElementById('btnLogin');
  
    btnLogin.addEventListener('click', validateCredentials);

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

        if (credentials != null) {
            console.log(credentials);
            let user = await getByEmail(email);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('token', credentials.token);
            await createUserLog(user._id, "login");
            window.location.href = 'menuAdmin.html';
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


    // Efectos de loading para los botones
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Solo aplicar loading si no es un botón de tipo submit
            if (this.type !== 'submit') {
                this.classList.add('btn-loading');
                const originalText = this.textContent;
                this.textContent = 'Procesando...';

                // Simular proceso (en tu implementación real esto no sería necesario)
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

});