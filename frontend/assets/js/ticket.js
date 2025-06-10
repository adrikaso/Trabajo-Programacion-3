document.addEventListener("DOMContentLoaded", () => {
    const ticket = JSON.parse(localStorage.getItem("ticketVenta"));

    if (!ticket) {
        document.body.innerHTML = "<p class='text-center mt-5'>No hay información del ticket.</p>";
        return;
    }

    document.getElementById("ventaId").textContent = ticket.ventaId || "Sin ID";

    document.getElementById("fecha").textContent = ticket.fecha || new Date().toLocaleString();

    document.getElementById("clienteNombre").textContent = ticket.clienteNombre || "-";

    const detalle = document.getElementById("detalleTicket");
    let total = 0;

    ticket.carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${subtotal.toLocaleString("es-AR")}</td>
    `;
        detalle.appendChild(fila);
    });

    document.getElementById("totalFinal").textContent = `$${total.toLocaleString("es-AR")}`;


    document.getElementById("btnVolver").addEventListener("click", () => {
        sessionStorage.clear();
        localStorage.removeItem("carrito");
        localStorage.removeItem("ticketVenta");
        window.location.href = "nombre.html";
    });
});

function descargarPDF() {
  const ticket = document.getElementById("ticketPDF");

  const opciones = {
    margin: 0,
    filename: `ticket-${Date.now()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true }, // está bien dentro de opciones
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(opciones).from(ticket).save();
}


