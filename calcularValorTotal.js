// Función para calcular el valor total
function calcularValorTotal() {
  const edadInput = document.getElementById("edad-input");
  let edad = parseInt(edadInput.value);
  if (isNaN(edad) || edad < 0 || edad > 60) {
    mostrarModal(); // Mostrar el modal si la edad no es válida
    return;
  }

  let precioInicial;
  switch (true) {
    case edad >= 0 && edad <= 12:
      precioInicial = 20000;
      break;
    case edad >= 13 && edad <= 25:
      precioInicial = 25000;
      break;
    case edad >= 26 && edad <= 35:
      precioInicial = 30000;
      break;
    case edad >= 36 && edad <= 60:
      precioInicial = 40000;
      break;
  }

  const incrementoTotal = calcularIncrementoTotal(precioInicial);
  const valorTotal = precioInicial + incrementoTotal;

  let detalleCoberturas = "";
  for (const cobertura of coberturas) {
    const opcionSeleccionada = document.querySelector(
      `select[data-cobertura="${cobertura}"]`
    ).value;
    detalleCoberturas += `${cobertura}: ${opcionSeleccionada}\n`;
  }

  Swal.fire({
    title: "Cobertura seleccionada",
    text: `El valor de la cobertura seleccionada es: $${valorTotal}\n\nDetalle de coberturas:\n${detalleCoberturas}`,
    icon: "fas fa-heartbeat",
    confirmButtonText: "Aceptar",
  });
}
