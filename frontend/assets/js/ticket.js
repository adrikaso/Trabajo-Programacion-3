// Ejecutar al cargar el DOM
window.addEventListener("DOMContentLoaded", loadTicket);

/**
 * Obtiene la venta por su ID desde el backend
 * @param {string} id - ID de la venta
 * @returns {Promise<Object>} - Objeto de la venta
 */
async function getSaleById(id) {
  try {
    const response = await fetch(`http://localhost:3000/sale/getSale/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Error al obtener la venta");
  }
}

/**
 * Obtiene los detalles de una venta (productos, cantidades, subtotales)
 * @param {string} id - ID de la venta
 * @returns {Promise<Array>} - Lista de detalles de venta
 */
async function getSaleDetailsById(id) {
  try {
    const response = await fetch(`http://localhost:3000/SaleDetails/getSaleDetailsBySaleId/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Error al obtener detalles de venta");
  }
}

/* Obtiene los detalles de un producto por su ID */

async function getProductDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/product/getProductDetails/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Error al obtener detalles del producto");
  }
}

/* Muestra la información del cliente y la fecha/hora de la compra en el ticket */

function setClientInfo(sale) {
  document.getElementById("clientName").textContent = sale.clientName || "Cliente Anónimo";

  const saleDate = new Date(sale.date);
  document.getElementById("purchaseDate").textContent = saleDate.toLocaleDateString();
  document.getElementById("purchaseTime").textContent = saleDate.toLocaleTimeString();
}

/*  Crea visualmente las filas del ticket con los productos y subtotales */

async function createTicket(list) {
  const detailsContainer = document.getElementById("purchaseDetails");

  for (const item of list) {
    const details = item.productId;

    const row = document.createElement("div");
    row.classList.add("info-row");
    row.innerHTML = `
      <span>${details.name} (x${item.quantity})</span>
      <strong>$${item.subtotal.toLocaleString()}</strong>
    `;

    detailsContainer.appendChild(row);
  }
}


// Carga el ticket automáticamente al cargar la página
// Obtiene el ID de la venta desde la URL y muestra todo el contenido

async function loadTicket() {
  const params = new URLSearchParams(window.location.search);
  const saleId = params.get("saleId");

  if (!saleId) {
    alert("ID de venta no especificado");
    return;
  }

  try {
    const sale = await getSaleById(saleId);
    const saleDetails = await getSaleDetailsById(saleId);

    setClientInfo(sale);
    await createTicket(saleDetails);

    // Mostrar el total de la venta directamente
    document.getElementById("totalPaid").textContent = `$${sale.total.toLocaleString()}`;

    // Redirige automaticamente al inicio despues de 10 segundos
    setTimeout(() => {
      window.location.href = "index.html";
    }, 10000);

    const btnBack = document.getElementById('goBackBtn');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        window.location.href = "index.html";
      });
    }
  } catch (error) {
    console.error(error);
    alert("Hubo un error al generar el ticket.");
  }
}

/**
 * Botón para descargar el ticket como PDF
 * Captura visualmente el contenido del ticket y lo exporta
 */
document.getElementById("downloadPdfBtn").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  const ticketElement = document.getElementById("ticket");

  /**
   * Captura visual del ticket:
   * html2canvas convierte el elemento HTML completo (ticket) en una imagen PNG
   * con escala 2 para mejor calidad
   */
  const canvas = await html2canvas(ticketElement, { scale: 2 });

  // Convierte el canvas a imagen PNG
  const imgData = canvas.toDataURL("image/png");

  /**
   * Crea un nuevo documento PDF con jsPDF:
   * Orientación vertical
   * Unidad en pixeles
   * Tamaño basado en el tamaño de la imagen capturada
   */
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`ticket_${new Date().getTime()}.pdf`);
});