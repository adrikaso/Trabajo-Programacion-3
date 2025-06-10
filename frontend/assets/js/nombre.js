function guardarNombre() {
  const nombreInput = document.getElementById("nombreCliente");
  const nombre = nombreInput.value.trim();

  const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$/;

  if (nombre.length < 2) {
    alert("Por favor, ingresá un nombre válido.");
    return;
  }

  if (nombre.length > 30) {
    alert("El nombre es demasiado largo (máx. 30 caracteres).");
    return;
  }

  if (!soloLetras.test(nombre)) {
    alert("Solo se permiten letras en el nombre.");
    return;
  }

  sessionStorage.setItem("clienteNombre", nombre);
  window.location.href = "productos.html";
}
