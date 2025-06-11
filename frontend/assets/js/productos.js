const container = document.getElementById("productosContainer");
const titulo = document.getElementById("tituloCategoria");

document.addEventListener("DOMContentLoaded", () => {
  const nombre = sessionStorage.getItem("clienteNombre");

  if (!nombre) {
    alert("Por favor ingresá tu nombre antes de continuar.");
    window.location.href = "nombre.html";
  }
});


async function mostrarCategoria(categoria) {
  container.innerHTML = "";
  titulo.classList.remove("d-none");
  titulo.textContent = categoria === 'suplemento' ? 'Suplementos disponibles' : 'Accesorios disponibles';

  try {
    const res = await fetch("http://localhost:3000/product/getAll");

    const productos = await res.json();
    const filtrados = productos.filter(p => p.categoria === categoria);

    filtrados.forEach((producto, i) => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

      col.innerHTML = `
        <div class="card producto-card text-center h-100 border-0 position-relative overflow-hidden">
          <div class="img-wrapper position-relative">
            <img src="${producto.imagen}" class="img-fluid w-100" alt="${producto.nombre}">
            <div class="overlay"></div>
          </div>
          <div class="card-body d-flex flex-column justify-content-end">
            <h5 class="card-title fw-semibold">${producto.nombre}</h5>
            <p class="card-text fw-bold">$${producto.precio.toLocaleString("es-AR")}</p>
            <button class="btn btn-primary rounded-pill mt-auto agregar-btn" data-id="${producto.id}">+ Agregar al carrito</button>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

    document.querySelectorAll(".agregar-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const prod = filtrados.find(p => p.id === id);
        agregarAlCarrito(prod);
      });
    });

    actualizarContadorCarrito();
  } catch (error) {
    console.error("❌ Error al cargar productos desde la API", error);
  }
}



// Agregar listeners a los botones de "Agregar"
document.querySelectorAll(".agregar-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    const prod = filtrados[index];
    agregarAlCarrito(prod);
  });
});

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(p => p.nombre === producto.nombre);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderCarritoResumen();

  mostrarToast(`${producto.nombre} agregado al carrito`);


}


function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById("contadorCarrito").textContent = total;
}

function renderCarritoResumen() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const lista = document.getElementById("listaCarrito");
  const totalSpan = document.getElementById("totalCarrito");
  const resumen = document.getElementById("carritoResumen");

  lista.innerHTML = "";

  if (carrito.length === 0) {
    resumen.classList.add("d-none");
    return;
  }

  resumen.classList.remove("d-none");

  let total = 0;
  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center justify-content-between";
    li.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: contain;">
        <span>${item.nombre} x${item.cantidad}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span>$${(item.precio * item.cantidad).toLocaleString("es-AR")}</span>
        <button class="btn btn-sm btn-outline-danger eliminar-item" data-nombre="${item.nombre}" title="Eliminar">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    lista.appendChild(li);
  });
  document.querySelectorAll(".eliminar-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.getAttribute("data-nombre");
      disminuirProductoDelCarrito(nombre);
    });
  });

  totalSpan.textContent = `$${total.toLocaleString("es-AR")}`;
}

function cancelarPedido() {
  localStorage.removeItem("carrito");
  actualizarContadorCarrito();
  renderCarritoResumen();
}


function disminuirProductoDelCarrito(nombre) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1); // elimina el producto
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderCarritoResumen();
}

function mostrarToast(mensaje) {
  const toastEl = document.getElementById("toastCarrito");
  const mensajeEl = document.getElementById("mensajeToast");
  mensajeEl.textContent = mensaje;

  const toast = new bootstrap.Toast(toastEl, {
    autohide: true,
    delay: 1500 //1.5 sgds 
  });

  toast.show();
}