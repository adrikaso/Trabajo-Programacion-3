
let rolList = [];

if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    rolList = await getAllRoles();

    const usersTable = document.getElementById('users-table');
    const tableBody = document.getElementById('users-table-body');
    const totalUsers = document.getElementById('total-users');
    const btnCreateUser = document.getElementById('btnCreateUser');

    btnCreateUser.addEventListener('click', () => {
        window.location.href = 'formCreateUser.html';
    });

    showUsers();

    const productsTable = document.getElementById('productsTable');
    const productsTableBody = document.getElementById('products-table-body');
    const totalProducts = document.getElementById('total-products');
    const activeProducts = document.getElementById('active-products');
    const inactiveProducts = document.getElementById('inactive-products');

    showProducts();

    const salesTableBody = document.getElementById('orders-table-body');

    showSales();

    const logsTable = document.getElementById('logsTable');
    const logsTableBody = document.getElementById('logs-table-body');
    const totalLogs = document.getElementById('total-logs');

    await showUserLogs();

    const totalSales = document.getElementById('total-sales');
    const totalOrders = document.getElementById('total-orders');
    const averageSales = document.getElementById('average-sales');
    const trendSales = document.getElementById('sales-trends');

    await showStatistics();

    const btnCloseSession = document.getElementById('btnCloseSession');
    btnCloseSession.addEventListener('click', logout);


    // Create Product
    const productName = document.getElementById('name');
    const productPrice = document.getElementById('price');
    const productCategory = document.getElementById('category');
    const productImg = document.getElementById('img');
    const productActive = document.getElementById('active');
    const btnCreateProduct = document.getElementById('btnCreateProduct');
    //img
    const preview = document.getElementById('preview');
    const placeholder = document.getElementById('preview-placeholder');

    btnCreateProduct.addEventListener('click', createProduct)
    productImg.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
            }

            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
            placeholder.style.display = 'block';
        }
    });

    loadCategories();



    const sectionData = {
        'Dashboard': {
            title: 'Dashboard',
            description: 'Descripción de la sección Dashboard'
        },
        'Users': {
            title: 'Usuarios',
            description: 'Descripción de la sección Usuarios'
        },
        'Products': {
            title: 'Productos',
            description: 'Descripción de la sección Productos'
        },
        'Sales': {
            title: 'Ventas',
            description: 'Descripción de la sección Ventas'
        },
        'Statistics': {
            title: 'Estadísticas',
            description: 'Descripción de la sección Estadísticas'
        },
        'Logs': {
            title: 'Logs',
            description: 'Descripción de la sección Logs'
        }
    };

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
        try {
            const users = await getAllUsers();
            const rolList = await getAllRoles();
            totalUsers.textContent = users.length;
            tableBody.innerHTML = '';

            for (const user of users) {
                const row = document.createElement('tr');
                const rolNames = await getRolNames(user.rol);

                row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${rolNames.join(', ')}</td>
                <td>${user.date}</td>
                <td>
                <button class="btn btn-secondary" data-user-id="${user._id}">Editar</button>
                </td>
                `;
                tableBody.appendChild(row);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getRolNames(rolIds) {
        try {
            let rolNames = [];
            for (const rolId of rolIds) {
                if (rolList.find(rol => rol._id === rolId)) {
                    rolNames.push(rolList.find(rol => rol._id === rolId).name);
                }
            }
            return rolNames;
        } catch (error) {
            console.error('Error al obtener los nombres de los roles:', error);
        }

    }

    async function getAllRoles() {
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
            return data;
        } catch (error) {
            console.error('Error showing roles:', error);
            throw error;
        }
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
        activeProducts.textContent = products.filter(product => product.active).length;
        inactiveProducts.textContent = products.filter(product => !product.active).length;
        productsTableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product._id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category.name}</td>
                <td>${product.active ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <button class="btn btn-secondary mr-0" data-product-id="${product._id}">Editar</button>
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

    async function logout() {
        if (localStorage.getItem('userId') != null) {
            await createUserLog("logout");
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    }

    async function createUserLog(action) {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch('http://localhost:3000/userLog/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

    async function getTotalSales() {
        try {
            const response = await fetch('http://localhost:3000/sale/getTotalSales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            return [];
        }
    }

    async function getAverageSales() {
        try {
            const response = await fetch('http://localhost:3000/sale/getAverageSales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            return [];
        }
    }

    async function getSumTotalSales() {
        try {
            const response = await fetch('http://localhost:3000/sale/getSumTotalSales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            return [];
        }
    }

    async function getTopProducts() {
        try {
            const response = await fetch('http://localhost:3000/saleDetails/getTopProducts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los productos más vendidos:', error);
            return [];
        }
    }

    async function showStatistics() {
        try {
            const sales = await getTotalSales();
            totalOrders.textContent = sales;

            const average = await getAverageSales();
            averageSales.textContent = average[0].average.toFixed(2);

            const sumTotal = await getSumTotalSales();
            totalSales.textContent = sumTotal[0].total.toFixed(2);

            const topProducts = await getTopProducts();
            topProducts.forEach((product, index) => {
                const div = document.createElement('div');
                div.className = 'top-product';
                div.innerHTML = `<span>${index + 1}. ${product.name}</span> <span>Unidades: ${product.totalVendidas}</span>`;
                trendSales.appendChild(div);
            });
        } catch (error) {
            totalOrders.textContent = "no autorizado";
            averageSales.textContent = "no autorizado";
            totalSales.textContent = "no autorizado";
            const div = document.createElement('div');
            div.className = 'top-product';
            div.innerHTML = `<span class="text-danger">no autorizado</span>`;
            trendSales.appendChild(div);
            console.error('Error al mostrar las estadísticas:', error);
        }
    }

    async function getAllSales() {
        try {
            const response = await fetch('http://localhost:3000/sale/getAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            return [];
        }
    }

    async function showSales() {
        try {
            const sales = await getAllSales();
            sales.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${sale._id}</td><td>${sale.date}</td><td>${sale.clientName}</td><td>${sale.total}</td> 
                <td><button class="btn btn-primary" data-sale-id="${sale._id}">Ver</button></td>`;
                salesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al mostrar las ventas:', error);
        }
    }

    async function getSaleDetails(saleId) {
        try {
            const response = await fetch(`http://localhost:3000/saleDetails/getSaleDetailsBySaleId/${saleId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error al obtener los detalles de la venta:', error);
            return [];
        }
    }

    getSaleDetails("6863dda1f3d7603f332922d7");

    // category

    async function loadCategories() {
        const response = await fetch("http://localhost:3000/category/getAll"); // o la ruta que tengas
        const categorias = await response.json();

        const select = document.getElementById("category");
        select.innerHTML = "";

        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat._id;            // 👈 ENVÍA EL ID REAL
            option.textContent = cat.name;
            select.appendChild(option);
            console.log("categorias obtenidas: " + cat.name);
        });
    }

    // Create Product

    function loadProductValues() {
        const product = {
            name: productName.value,
            price: productPrice.value,
            pictureURL: productImg.value,
            category: productCategory.value,
            active: productActive.checked
        };
        return product;
    }

    async function uploadImage() {
        const formData = new FormData();
        const pictureInput = document.getElementById('img');

        formData.append('picture', pictureInput.files[0]);

        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Error al subir imagen");

        const data = await response.json(); // contiene pictureURL
        return data.pictureURL;
    }



    async function createProduct() {
        try {
            const pictureURL = await uploadImage();

            let product = loadProductValues();
            product.pictureURL = pictureURL;
            product.category = document.getElementById('category').value;

            const url = 'http://localhost:3000/product/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    product
                )
            });

            const data = await response.json();
            console.log('Producto creado:', data);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    }

    async function testUpdateProduct() {
        try {
            const id = productID.value.trim();
            let product = loadProductValues();
            const url = `http://localhost:3000/product/update/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    product
                )
            });

            const data = await response.json();
            console.log('Producto actualizado:', data);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    }




});