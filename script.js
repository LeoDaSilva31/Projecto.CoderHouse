const edadForm = document.getElementById('edad-form');
const resultadoFinal = document.getElementById('resultado-final');
const coberturasContainer = document.getElementById('coberturas-container');
const botonCalcular = document.querySelector('.btn');

const coberturas = ["Guardias", "Dentales", "Medicamentos", "Salud Mental", "Cirugías Plásticas", "Consultorios", "Análisis", "Rayos"];

// Función para crear los divs con listas desplegables
function crearDivsCoberturas() {
  for (const cobertura of coberturas) {
    const div = document.createElement('div');
    div.classList.add('cobertura');
    const label = document.createElement('label');
    const select = document.createElement('select');

    label.textContent = cobertura;

    const opcionNinguna = document.createElement('option');
    opcionNinguna.value = 'Ninguna';
    opcionNinguna.text = 'Ninguna';

    const opcionSimple = document.createElement('option');
    opcionSimple.value = 'Simple';
    opcionSimple.text = 'Simple';

    const opcionCompleta = document.createElement('option');
    opcionCompleta.value = 'Completa';
    opcionCompleta.text = 'Completa';

    select.add(opcionNinguna);
    select.add(opcionSimple);
    select.add(opcionCompleta);
    select.setAttribute('data-cobertura', cobertura);

    div.appendChild(label);
    div.appendChild(select);

    coberturasContainer.appendChild(div);
  }
}

// Función para calcular el incremento total
function calcularIncrementoTotal(precioInicial) {
  let incrementoTotal = 0;

  for (const cobertura of coberturas) {
    const opcionSeleccionada = document.querySelector(`select[data-cobertura="${cobertura}"]`).value;

    let porcentajeIncremento;
    switch (opcionSeleccionada) {
      case "Ninguna":
        porcentajeIncremento = 0;
        break;
      case "Simple":
        porcentajeIncremento = 5;
        break;
      case "Completa":
        porcentajeIncremento = 10;
        break;
    }

    let incremento = precioInicial * (porcentajeIncremento / 100);
    incrementoTotal += incremento;
  }

  return incrementoTotal;
}

// Función para calcular el valor total
function calcularValorTotal() {
  const edadInput = document.getElementById('edad-input');
  let edad = parseInt(edadInput.value);

  if (isNaN(edad) || edad < 0 || edad > 60) {
    mostrarModal(); // Mostrar el modal si la edad no es válida
    return;
  }

  let precioInicial;
  switch (true) {
    case (edad >= 0 && edad <= 12):
      precioInicial = 20000;
      break;
    case (edad >= 13 && edad <= 25):
      precioInicial = 25000;
      break;
    case (edad >= 26 && edad <= 35):
      precioInicial = 30000;
      break;
    case (edad >= 36 && edad <= 60):
      precioInicial = 40000;
      break;
  }

  const incrementoTotal = calcularIncrementoTotal(precioInicial);
  const valorTotal = precioInicial + incrementoTotal;

  resultadoFinal.textContent = `$${valorTotal}`;
}

// Obtener elementos del modal
const modal = document.getElementById("modal");
const cerrar = document.getElementsByClassName("cerrar")[0];

// Función para mostrar el modal
function mostrarModal() {
  modal.style.display = "block";
}

// Función para ocultar el modal al hacer clic en la "x"
cerrar.onclick = function() {
  modal.style.display = "none";
}

// Función para ocultar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Evento para el cálculo del valor total
botonCalcular.addEventListener('click', calcularValorTotal);

// Crear los divs con listas desplegables al cargar la página
crearDivsCoberturas();