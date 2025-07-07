
# 🏋️‍♂️ Tu Suplemento

**Tu Suplemento** es una aplicación web diseñada para funcionar como un sistema de **autoservicio de suplementos deportivos y accesorios**, similar a las terminales táctiles que se encuentran en locales de comida rápida. El proyecto combina una interfaz de usuario accesible con una potente área de administración para gestionar usuarios, productos, ventas y estadísticas.

---

## 📌 Características destacadas

### 🖥️ Interfaz de autoservicio (cliente)
- Pantalla de inicio pensada para pantallas táctiles.
- Teclado virtual integrado para facilitar la navegación.
- Visualización de productos disponibles y carrito de compras.
- Generación y descarga de **ticket de compra**.

### 🔐 Acceso administrativo oculto
- Acceso al **login oculto** presionando la combinación `Ctrl + Shift + A` desde la pantalla principal.
- Dos niveles de acceso:
  - **Admin**: puede gestionar productos y visualizar estadísticas.
  - **Super Admin**: acceso completo, incluyendo gestión de usuarios y logs del sistema.

### 🧑‍💼 Panel de administración
- **Gestión de usuarios**: crear, editar, eliminar y visualizar.
- **Gestión de productos**: CRUD completo con carga de imágenes mediante **Multer**.
- **Visualización de ventas**: listado de todas las ventas y sus detalles.
- **Estadísticas**:
  - Total de ventas.
  - Ganancia acumulada.
  - Top 3 productos más vendidos.
- **Registro de actividad (User Logs)**:
  - Registra acciones como creación, edición, eliminación e inicio/cierre de sesión.
  - Muestra qué usuario realizó la acción, en qué fecha y a qué hora.

---

## 🛠️ Tecnologías utilizadas

| Tecnología       | Descripción                                            |
|------------------|--------------------------------------------------------|
| **HTML, CSS, JS**| Desarrollo del frontend y experiencia de usuario       |
| **Node.js**      | Entorno de ejecución del backend                       |
| **Express**      | Framework para gestión de rutas y lógica de servidor   |
| **MongoDB**      | Base de datos NoSQL para persistencia de datos         |
| **Mongoose**     | ORM para interactuar con MongoDB                       |
| **JWT**          | Autenticación por tokens para seguridad y sesiones     |
| **LocalStorage** | Manejo de sesión y roles del lado del cliente          |
| **Multer**       | Middleware para carga de imágenes                      |

---

## 🌗 Modo oscuro / claro

El menu de administrador soporta cambio de tema visual mediante un **modo claro y oscuro**, gestionado con **variables CSS** para un control eficiente y limpio del diseño.

---

## 🗂️ Estructura del proyecto

```plaintext
📦 tu-suplemento/
├── backend/
│   ├── config/              # Configuración del entorno
│   ├── controllers/         # Lógica de control de rutas
│   ├── middlewares/         # Autenticación, validaciones, etc.
│   ├── node_modules/
│   ├── persistence/
│   │   ├── models/          # Modelos de datos (Mongoose)
│   │   └── repositories/    # Acceso a base de datos
│   ├── routes/              # Rutas de API
│   ├── services/            # Lógica de negocio
│   ├── uploads/             # Almacenamiento de imágenes
│   ├── views/               # (opcional para plantillas)
│   ├── .env                 # Variables de entorno
│   ├── app.js               # Punto de entrada del backend
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── assets/
│   │   ├── css/             # Estilos globales y temas
│   │   ├── img/             # Recursos gráficos
│   │   └── js/              # Scripts para cada vista
│   ├── cart.html
│   ├── formCreateUser.html
│   ├── index.html           # Pantalla principal (táctil)
│   ├── login.html           # Pantalla de login (oculta)
│   ├── menuAdmin.html       # Pantalla de Administrador
│   ├── products.html        # Pantalla de Compra
│   └── ticket.html          # Pantalla de Ticket
│
├── .gitignore              # Archivo para ignorar 
```

---

## 🧪 Instalación local

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-suplemento.git
   cd tu-suplemento
   ```

2. Instalá dependencias:

   ```bash
   npm install
   ```

3. Configurá el archivo `.env` con tu conexión a MongoDB:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tu-suplemento
   JWT_SECRET=tu_clave_secreta
   ```

4. Ejecutá el proyecto:

   ```bash
   node app.js
   ```

5. Abrí `frontend/index.html` en tu navegador para usar el sistema.

---

## 👥 Autores

- **Daniel Iwach** – [GitHub](https://github.com/Daniel-iwach)
- **Adrián Lezcano** – [GitHub](https://github.com/adrikaso)

---

## 📅 Duración del proyecto

- ⏱️ 1 mes de desarrollo
- 👥 Equipo de 2 personas

---

## 📜 Licencia

Este proyecto fue desarrollado con fines educativos y no posee una licencia comercial. Para uso o colaboración, contactá a los autores.

---
