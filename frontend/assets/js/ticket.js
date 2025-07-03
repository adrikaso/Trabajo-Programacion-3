async function getSaleById(id) {
  try {
    const response = await fetch(`http://localhost:3000/sale/getSale/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Error al obtener la venta");
  }
}

async function getSaleDetailsById(id) {
  try {
    const response = await fetch(`http://localhost:3000/SaleDetails/getSaleDetailsBySaleId/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Error al obtener detalles de venta");
  }
}

async function getProductDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/product/getProductDetails/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Error al obtener detalles del producto");
  }
}

function setClientInfo(sale) {
  document.getElementById("clientName").textContent = sale.clientName || "Cliente Anónimo";

  const saleDate = new Date(sale.date);
  document.getElementById("purchaseDate").textContent = saleDate.toLocaleDateString();
  document.getElementById("purchaseTime").textContent = saleDate.toLocaleTimeString();
}

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

    // Redirigir al inicio
    setTimeout(() => {
		window.location.href = "/frontend/index.html";
    }, 7000);

  } catch (error) {
    console.error(error);
    alert("Hubo un error al generar el ticket.");
  }
}

window.addEventListener("DOMContentLoaded", loadTicket);

document.getElementById("downloadPdfBtn").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  const ticketElement = document.getElementById("ticket");

  // Capturar el ticket como imagen
  const canvas = await html2canvas(ticketElement, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  // Crear PDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`ticket_${new Date().getTime()}.pdf`);
});