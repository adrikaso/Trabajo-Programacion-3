let rolList = [];
let originalProductData = null;
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', async () => {

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

    rolList = await getAllRoles();

    const usersTable = document.getElementById('users-table');
    const tableBody = document.getElementById('users-table-body');
    const totalUsers = document.getElementById('total-users');
    const btnCreateUser = document.getElementById('btnCreateUser');

    btnCreateUser.addEventListener('click', () => {
        window.location.href = 'formCreateUser.html';
    });

    let userToUpdate = null;

    const inputName = document.getElementById('user-name');
    const inputEmail = document.getElementById('user-emailCreate');
    const inputPassword = document.getElementById('user-passwordCreate');
    const btnFormReset = document.getElementById('btnFormReset');
    const btnUpdateUser = document.getElementById('btnUpdateUser');
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    const userActive = document.getElementById('userActive');

    btnUpdateUser.addEventListener('click', updateUser);
    btnFormReset.addEventListener('click', clearForm);

    showUsers();

    const productsTable = document.getElementById('productsTable');
    const productsTableBody = document.getElementById('products-table-body');
    const totalProducts = document.getElementById('total-products');
    const activeProducts = document.getElementById('active-products');
    const inactiveProducts = document.getElementById('inactive-products');

    showProducts();

    const salesTableBody = document.getElementById('orders-table-body');

    const saleDetailsModal = new bootstrap.Modal(document.getElementById('saleDetailsModal'));
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


    const productName = document.getElementById('name');
    const productPrice = document.getElementById('price');
    const productCategory = document.getElementById('category');
    const productImg = document.getElementById('img');
    const productActive = document.getElementById('active');
    const btnCreateProduct = document.getElementById('btnCreateProduct');
    const btnUpdateProduct = document.getElementById('btnUpdateProduct');
    let selectedProductId = null;

    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    const preview = document.getElementById('preview');
    const placeholder = document.getElementById('preview-placeholder');

    btnCreateProduct.addEventListener('click', createProduct)
    btnUpdateProduct.addEventListener('click', updateProduct);

    //Validación si está creando o editando con data-action
    document.addEventListener('click', function (e) {
        const button = e.target.closest('button[data-action="create"]');
        if (button) {
            resetProductForm();
            btnCreateProduct.style.display = 'inline-block';
            btnUpdateProduct.style.display = 'none';
        }
    });

    //Vista previa de la imagen
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



    }

    // Event listeners para los items del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            switchSection(section);
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

    // ====================
    // Sección: Gestión de Usuarios
    // ====================
    /* Obtiene todos los usuarios del backend */
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
    /* Muestra todos los usuarios en la tabla del admin */
    async function showUsers() {
        try {
            const users = await getAllUsers();
            const rolList = await getAllRoles();
            totalUsers.textContent = users.length;
            tableBody.innerHTML = '';

            for (const user of users) {
                const row = document.createElement('tr');
                const rolNames = await getRolNames(user.rol);
                const parseDate = new Date(user.date);
                parseDate.setHours(parseDate.getHours())

                row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${rolNames.join(', ')}</td>
                <td>${user.active ? 'Activo' : 'Inactivo'}</td>
                <td>${parseDate.toLocaleString('es-AR')}</td>
                `;
                const editBtn = document.createElement('button');
                editBtn.className = 'btn btn-secondary btnEditUser';
                editBtn.textContent = 'Editar';
                editBtn.setAttribute('data-user-id', user._id);
                editBtn.setAttribute('data-bs-toggle', 'modal');
                editBtn.setAttribute('data-bs-target', '#userModal');

                editBtn.addEventListener('click', async () => {
                    clearForm();
                    userModal.show();
                    await loadUserValuesById(user._id);
                });

                const actionsTd = document.createElement('td');
                actionsTd.appendChild(editBtn);
                row.appendChild(actionsTd);

                tableBody.appendChild(row);
            }
        } catch (error) {
            console.log(error);
        }
    }


    //--form edit user--
    /* Obtiene los valores del formulario de edición de usuario */
    async function getUserValues() {
        let roles = [];

        document.querySelectorAll('input[name="roles"]:checked').forEach(checkbox => {
            const roleName = checkbox.value;
            const role = rolList.find(r => r.name === roleName);
            if (role) {
                roles.push(role._id);
            }
        });

        console.log(roles);
        return {
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value,
            active: userActive.checked,
            rol: roles
        }
    }
    /* Actualiza el usuario en el backend */
    async function updateUser() {
        try {
            const values = await getUserValues();

            // Si el campo password está vacío no toca el password actual
            if (!values.password || values.password.trim() === '') {
                delete values.password;
            }

            const response = await fetch(`http://localhost:3000/user/update/${userToUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(values),
            })
            const data = await response.json();
            userModal.hide();
            console.log(data);
            showUsers();
            await createUserLog("Ha actualizado el usuario " + userToUpdate.name);
        } catch (error) {
            console.log(error);
        }
    }
    /* Limpiar el formulario al cerrar el modal */
    document.getElementById('userModal').addEventListener('hidden.bs.modal', () => {
        document.getElementById('formUser').reset();
    });
    /* Limpia el formulario y vuelve a renderizar los roles */
    function clearForm() {
        userToUpdate = null;
        inputName.value = '';
        inputEmail.value = '';
        inputPassword.value = '';
        userActive.checked = true;
        document.getElementById('roleCheckboxContainer').innerHTML = '';
    }
    /* Obtiene los valores del usuario por su ID */
    async function loadUserValuesById(userId) {
        try {
            const user = await getUserById(userId);
            inputName.value = user.name;
            inputEmail.value = user.email;
            userActive.checked = user.active;
            await renderRols();
            const rolNames = await getRolNames(user.rol);
            rolNames.forEach(rol => {
                const checkbox = document.getElementById(`rol-${rol}`);
                checkbox.checked = true;
            })
            userToUpdate = {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                active: user.active,
                rol: user.rol
            }
        } catch (error) {
            console.log(error);
        }
    }
    /* Renderiza los roles en el formulario de edición de usuario */
    async function renderRols() {
        try {
            const roles = await getAllRoles();
            const container = document.getElementById('roleCheckboxContainer');
            container.innerHTML = ""; // Limpia contenido anterior

            roles.forEach(role => {
                const div = document.createElement('div');
                div.classList.add('form-check');

                div.innerHTML = `
                <input class="form-check-input-user" type="checkbox" name="roles" value="${role.name}" id="rol-${role.name}">
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
    /* Obtiene un usuario por su ID */
    async function getUserById(userId) {
        try {
            const response = await fetch(`http://localhost:3000/user/getById/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener el usuario por ID:', error);
            return null;
        }
    }
    /* Obtiene los nombres de los roles por sus IDs */
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
    /* Obtiene todos los roles */
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

    // ====================
    // Sección: Gestión de Productos
    // ====================

    /* Obtiene todos los productos */
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
    /* Renderiza los productos en la tabla */
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
            `;
            // Botón Editar
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-secondary';
            editBtn.textContent = 'Editar';
            editBtn.setAttribute('data-bs-toggle', 'modal');
            editBtn.setAttribute('data-action', 'edit');
            editBtn.setAttribute('data-bs-target', '#productModal');
            editBtn.addEventListener('click', () => {
                resetProductForm();
                loadProductValuesById(product._id);
                btnCreateProduct.style.display = 'none';            // Ocultamos botón Crear
                btnUpdateProduct.style.display = 'inline-block';
            });
            const actionsTd = document.createElement('td');
            actionsTd.appendChild(editBtn);
            row.appendChild(actionsTd);

            productsTableBody.appendChild(row);
        });
    }

    // -----------------Formulario de Productos-----------------
    // Categorias
    /* Obtiene todas las categorias */
    async function getAllCategories() {
        try {
            const response = await fetch("http://localhost:3000/category/getAll");
            const categories = await response.json();
            return categories;
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    }
    /* Carga las categorias en el select */
    async function loadCategories() {
        const categorias = await getAllCategories();

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

    // Crear Producto
    /* Obtiene los valores del formulario */
    function getProductValues() {
        const product = {
            name: productName.value,
            price: productPrice.value,
            pictureURL: productImg.value,
            category: productCategory.value,
            active: productActive.checked
        };
        return product;
    }

    /* Sube la imagen al back */
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
    /* Crea el producto */
    async function createProduct() {
        try {
            const pictureURL = await uploadImage();

            let product = getProductValues();
            product.pictureURL = pictureURL;
            product.category = document.getElementById('category').value;

            const url = 'http://localhost:3000/product/create';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(
                    product
                )
            });

            const data = await response.json();
            productModal.hide();
            showProducts();
            await createUserLog('Ha creado el producto ' + product.name);
            console.log('Producto creado:', data);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    }

    // Actualizar Producto
    /* Obtiene un producto por su ID */
    async function getProductById(id) {
        try {
            const response = await fetch(`http://localhost:3000/product/getProduct/${id}`, {
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
            console.error('Error al obtener el producto por ID:', error);
            return null;
        }
    }
    /* Obtiene los valores del formulario */
    function getProductValuesForUpdate() {
        const product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            active: productActive.checked
        };

        //  verificamos si se subió al menos un archivo si no se subió nada lo dejamos tal cual esta
        const pictureInput = document.getElementById('img');
        if (pictureInput.files.length > 0) {
            product.pictureURL = pictureInput.files[0];
        }

        return product;
    }
    /* Muestra la imagen previa */
    function showPreviewImage(url) {
        preview.src = url;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
    }
    /* Obtiene los valores del producto por su ID */
    async function loadProductValuesById(id) {
        try {
            const product = await getProductById(id);
            originalProductData = product;
            showPreviewImage(`http://localhost:3000${product.pictureURL}`);
            productName.value = product.name;
            productPrice.value = product.price;
            productCategory.value = product.category._id;
            productActive.checked = product.active;

            selectedProductId = product._id;
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    }
    /* Actualiza el producto */
    async function updateProduct() {
        try {
            // verificamos si se ha seleccionado una nueva imagen
            const product = getProductValuesForUpdate();
            // si hay una nueva imagen la subo
            let pictureURL = product.pictureURL;
            if (pictureURL instanceof File) {
                pictureURL = await uploadImage(); // subo la nueva imagen 
            }
            // actualizamos el producto con la nueva imagen
            product.pictureURL = pictureURL;

            const url = `http://localhost:3000/product/update/${selectedProductId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(
                    product
                )
            });

            productModal.hide();

            showProducts();
            const data = await response.json();

            const changes = getProductChanges(originalProductData, product);
            if (changes.length > 0) {
                const logMessage = `Modificó ${product.name} - cambios: ${changes.join(' | ')}`;
                await createUserLog(logMessage);
            }
            showUserLogs();
            console.log('Producto actualizado:', data);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    }

    // compara la data del producto original con la data del producto a actualizar, esto lo usamos para los logs
    function getProductChanges(oldProduct, newProduct) {
        const changes = [];

        if (oldProduct.name !== newProduct.name) {
            changes.push(`nombre: ${oldProduct.name} → ${newProduct.name}`);
        }

        if (oldProduct.price !== parseFloat(newProduct.price)) {
            changes.push(`precio: ${oldProduct.price} → ${newProduct.price}`);
        }

        const oldCatId = typeof oldProduct.category === 'object' ? oldProduct.category._id : oldProduct.category;
        if (oldCatId !== newProduct.category) {
            changes.push(`categoría cambiada`);
        }

        if (oldProduct.active !== newProduct.active) {
            changes.push(`activo: ${oldProduct.active ? 'Sí' : 'No'} → ${newProduct.active ? 'Sí' : 'No'}`);
        }

        if (newProduct.pictureURL && typeof newProduct.pictureURL === 'string' && oldProduct.pictureURL !== newProduct.pictureURL) {
            changes.push(`imagen cambiada`);
        }

        return changes;
    }
    /* Reinicia el formulario */
    function resetProductForm() {
        productName.value = '';
        productPrice.value = '';
        productCategory.value = '';
        productActive.checked = false;
        productImg.value = '';
        preview.src = '';
        preview.style.display = 'none';
        placeholder.style.display = 'block';
        console.log("formulario reinicidao")
    }

    // ====================
    // Sección: Gestión de Ventas
    // ====================
    //----------------ver venta completa-----------------------

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
            return data;
        } catch (error) {
            console.error('Error al obtener los detalles de la venta:', error);
            return [];
        }
    }

    async function viewSaleDetails(saleId) {
        try {
            // Mostrar loading
            document.getElementById('saleDetailsContent').innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Cargando detalles de la venta...</p>
                </div>
            `;

            // Mostrar modal
            saleDetailsModal.show();

            // Obtener detalles
            const saleDetails = await getSaleDetails(saleId);

            if (saleDetails && saleDetails.length > 0) {
                renderSaleDetails(saleDetails, saleId);
            } else {
                document.getElementById('saleDetailsContent').innerHTML = `
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        No se encontraron detalles para esta venta.
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error al obtener los detalles de la venta:', error);
            document.getElementById('saleDetailsContent').innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Error al cargar los detalles de la venta.
                </div>
            `;
        }
    }

    function renderSaleDetails(saleDetails, saleId) {
        console.log(saleDetails);
        const total = saleDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
        const totalItems = saleDetails.reduce((sum, detail) => sum + detail.quantity, 0);

        const content = `
            <div class="sale-summary">
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-hashtag me-2"></i>ID de Venta: ${saleId}</h6>
                    </div>
                    <div class="col-md-6 text-end">
                        <h6><i class="fas fa-box me-2"></i>Total de Artículos: ${totalItems}</h6>
                    </div>
                </div>
            </div>

            <h6 class="mb-3"><i class="fas fa-list me-2"></i>Productos de la Venta:</h6>
            
            <div class="details-container">
                ${saleDetails.map(detail => `
                    <div class="detail-row">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <div class="product-name">${detail.productId.name || 'Producto ID: ' + detail.productId._id}</div>
                                <small class="text-muted">ID: ${detail.productId._id}</small>
                            </div>
                            <div class="col-md-2 text-center">
                                <span class="quantity-badge">Cant: ${detail.quantity}</span>
                            </div>
                            <div class="col-md-2 text-center">
                                <small class="text-muted">Precio Unit.</small><br>
                                $${formatCurrency(detail.subtotal / detail.quantity)}
                            </div>
                            <div class="col-md-2 text-end">
                                <div class="subtotal">$${formatCurrency(detail.subtotal)}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="total-section">
                <div class="row">
                    <div class="col-md-8">
                        <h6 class="mb-0">Total de la Venta:</h6>
                    </div>
                    <div class="col-md-4 text-end">
                        <div class="total-amount">$${formatCurrency(total)}</div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('saleDetailsContent').innerHTML = content;
    }

    function formatCurrency(amount) {
        // Formatear número a moneda con 2 decimales
        return parseFloat(amount).toFixed(2);
    }

    // ====================
    // Sección: Gestión de Estadisticas
    // ====================

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
                const parseDate = new Date(sale.date);
                parseDate.setHours(parseDate.getHours())
                row.innerHTML = `<td>${sale._id}</td><td>${parseDate.toLocaleString('es-AR')}</td><td>${sale.clientName}</td><td>${sale.total}</td> 
                <td><button class="btn btn-primary" id="btnSale" data-sale-id="${sale._id}">Ver</button></td>`;
                salesTableBody.appendChild(row);
            });
            document.querySelectorAll('#btnSale').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const saleId = btn.getAttribute('data-sale-id');
                    await viewSaleDetails(saleId);
                })
            })
        } catch (error) {
            console.error('Error al mostrar las ventas:', error);
        }
    }

    // ====================
    // Sección: Gestión de User Logs
    // ====================

    async function getAllUserLogs() {
        try {
            const response = await fetch('http://localhost:3000/userLog/getAllWithUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los registros de usuarios:', error);
            return [];
        }
    }

    async function showUserLogs() {
        try {
            const userLogs = await getAllUserLogs();
            totalLogs.textContent = userLogs.length;
            logsTableBody.innerHTML = '';

            userLogs.forEach(userLog => {
                const parseDate = new Date(userLog.date);
                parseDate.setHours(parseDate.getHours())

                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${parseDate.toLocaleString('es-AR')}</td>
                <td>${userLog.userId.email}</td>
                <td>${userLog.action}</td>
            `;
                
                logsTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al mostrar los registros de usuarios:', error);
        }

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

});

