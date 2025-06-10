function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Obtener referencias
const lista = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("totalCarrito");

// Cargar el carrito al iniciar
document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();
});

// Función principal: renderizar el carrito
function renderCarrito() {
  const carrito = obtenerCarrito();
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
    totalSpan.textContent = "$0";
    return;
  }

  let total = 0;
  const table = document.createElement("table");
  table.className = "table table-hover align-middle";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Producto</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
      <th></th>
    </tr>
  `;

  const tbody = document.createElement("tbody");

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="d-flex align-items-center gap-2">
        <img src="${item.imagen}" style="width: 50px; height: 50px; object-fit: contain;">
        ${item.nombre}
      </td>
      <td>$${item.precio.toLocaleString("es-AR")}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary btn-restar" data-index="${index}">-</button>
        <span class="mx-2">${item.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary btn-sumar" data-index="${index}">+</button>
      </td>
      <td>$${subtotal.toLocaleString("es-AR")}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(fila);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  lista.appendChild(table);

  totalSpan.textContent = `$${total.toLocaleString("es-AR")}`;

  // Agregar listeners de botones
  document.querySelectorAll(".btn-restar").forEach(btn => {
    btn.addEventListener("click", () => modificarCantidad(+btn.dataset.index, -1));
  });

  document.querySelectorAll(".btn-sumar").forEach(btn => {
    btn.addEventListener("click", () => modificarCantidad(+btn.dataset.index, 1));
  });

  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", () => eliminarProducto(+btn.dataset.index));
  });
}

function modificarCantidad(index, cambio) {
  const carrito = obtenerCarrito();
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito(carrito);
  renderCarrito();
}

function eliminarProducto(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderCarrito();
}

function cancelarPedido() {
  if (confirm("¿Estás seguro de cancelar tu pedido?")) {
    localStorage.removeItem("carrito");
    renderCarrito();
  }
}

async function confirmarPago() {
  const carrito = obtenerCarrito();
  const clienteNombre = sessionStorage.getItem("clienteNombre") || "";

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const carritoFormateado = carrito.map(item => ({
    ...item,
    _id: item.id
  }));

  try {
    const res = await fetch("http://localhost:3000/api/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteNombre,
        carrito: carritoFormateado
      })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("ticketVenta", JSON.stringify({
        ventaId: data.ventaId,
        carrito,
        total: calcularTotal(carrito),
        fecha: new Date().toLocaleString(),
        clienteNombre
      }));

      localStorage.removeItem("carrito");
      sessionStorage.removeItem("clienteNombre");
      window.location.href = "ticket.html";
    } else {
      throw new Error(data.mensaje || "Error en la compra");
    }
  } catch (err) {
    console.error("Error al pagar:", err);
    alert("Ocurrió un error al procesar el pago.");
  }
}

function calcularTotal(carrito) {
  return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}
