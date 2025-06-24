// document.addEventListener('DOMContentLoaded', async () => {
//     await loadTicket();
// });

// async function loadTicket() {
//     try {
//         // Obtener datos del cliente
//         const clientResponse = await fetch('http://localhost:3000/client/getLast');
//         const clientData = await clientResponse.json();

//         // Obtener datos de la venta
//         const saleResponse = await fetch('http://localhost:3000/sale/getLast');
//         const saleData = await saleResponse.json();

//         // Obtener detalles de los ítems
//         const itemsResponse = await fetch('http://localhost:3000/itemCart/getLastSaleItems');
//         const items = await itemsResponse.json();

//         // Llenar los campos del ticket
//         document.getElementById('clientName').textContent = clientData?.name || 'Cliente';
//         const date = new Date(saleData?.createdAt);
//         document.getElementById('purchaseDate').textContent = date.toLocaleDateString();
//         document.getElementById('purchaseTime').textContent = date.toLocaleTimeString();

//         document.getElementById('ticketNumber').textContent = saleData?.ticketNumber || '#TKT-000001';
//         document.getElementById('totalPaid').textContent = `$${saleData?.total?.toFixed(2) || '0.00'}`;

//         // Renderizar detalles de la compra
//         const detailsContainer = document.getElementById('purchaseDetails');
//         detailsContainer.innerHTML = '';
//         items.forEach(item => {
//             const div = document.createElement('div');
//             div.className = 'purchase-item mb-2';
//             div.innerHTML = `
//                 <div class="d-flex justify-content-between">
//                     <span>${item.productName} x${item.quantity}</span>
//                     <strong>$${(item.unitPrice * item.quantity).toFixed(2)}</strong>
//                 </div>
//             `;
//             detailsContainer.appendChild(div);
//         });

//     } catch (error) {
//         console.error('Error al cargar el ticket:', error);
//         alert('Error al cargar el ticket. Intenta nuevamente.');
//     }
// }