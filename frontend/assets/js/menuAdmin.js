document.addEventListener('DOMContentLoaded', async () => {
    
    const usersTable = document.getElementById('users-table');
    const tableBody = document.getElementById('users-table-body');
    const totalUsers = document.getElementById('total-users');
    
    showUsers();

    const productsTable = document.getElementById('productsTable');
    const productsTableBody = document.getElementById('products-table-body');
    const totalProducts = document.getElementById('total-products');
    const activeProducts = document.getElementById('active-products');
    const inactiveProducts = document.getElementById('inactive-products');

    showProducts();

    const logsTable = document.getElementById('logsTable');
    const logsTableBody = document.getElementById('logs-table-body');
    const totalLogs = document.getElementById('total-logs');

    await showUserLogs();

    const salesTable = document.getElementById('salesTable');
    

    
    // Función para cambiar de sección
    function switchSection(sectionName) {
        // Remover clase active de todos los items del menú
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Agregar clase active al item seleccionado
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección seleccionada
        document.getElementById(sectionName).classList.add('active');
        
        // Actualizar título y descripción
        const data = sectionData[sectionName];
        document.getElementById('section-title').textContent = data.title;
        document.getElementById('section-description').textContent = data.description;
    }
    
    // Event listeners para los items del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Función para los botones de acción
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const action = btn.textContent;
            
            // Efecto visual
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // Simular acción (aquí puedes integrar con tu backend)
            console.log(`Acción: ${action} ejecutada`);
            
            // Mostrar feedback visual
            const originalText = btn.textContent;
            btn.textContent = '✓';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 1000);
        });
    });
    
    
    // Efectos de hover mejorados para las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Animación de carga inicial
    window.addEventListener('load', () => {
        document.querySelectorAll('.card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    async function getAllUsers() {
        try {
            const response = await fetch('http://localhost:3000/user/getAll');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            return [];
        }
    }

    async function showUsers() {
        const users = await getAllUsers();
        totalUsers.textContent = users.length;
        tableBody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.rol}</td>
                <td>${user.date}</td>
                <td>
                    <button class="btn btn-secondary" data-user-id="${user._id}">Editar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

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

    async function showProducts() {
        const products = await getAllProducts();
        totalProducts.textContent = products.length;
        activeProducts.textContent = products.filter(product => product.activo).length;
        inactiveProducts.textContent = products.filter(product => !product.activo).length;
        productsTableBody.innerHTML = '';
        
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product._id}</td>
                <td>${product.nombre}</td>
                <td>${product.precio}</td>
                <td>${product.categoria}</td>
                <td>${product.activo? 'Activo' : 'Inactivo'}</td>
                <td>
                    <button class="btn btn-secondary" data-product-id="${product._id}">Editar</button>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
    }

    async function getAllUserLogs() {
        try {
            const response = await fetch('http://localhost:3000/userLog/getAllWithUser');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los registros de usuarios:', error);
            return [];
        }
    }

    async function showUserLogs() {
        const userLogs = await getAllUserLogs();
        totalLogs.textContent = userLogs.length;
        logsTableBody.innerHTML = '';
        
        userLogs.forEach(userLog => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${userLog.date}</td>
                <td>${userLog.userId.email}</td>
                <td>${userLog.action}</td>
            `;
            logsTableBody.appendChild(row);
        });
    }

    
    
    

    




});