// VALIDACIÓN DE LA EDAD DEL USUARIO
let edad;

while (true) {
  edad = parseInt(prompt("Ingrese su edad (entre 0 y 60): "));

  if (isNaN(edad)) {
    console.log("Error: Ingrese un número válido.");
  } else if (edad < 0 || edad > 60) {
    console.log("Edad inválida. Ingrese un valor entre 0 y 60.");
  } else {
    break;
  }
}

console.log("Su edad ingresada es:", edad);

// DETERMINACIÓN DEL PRECIO INICIAL SEGÚN LA EDAD
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

console.log("El precio inicial para el cálculo es de:", precioInicial, "pesos.");

// CALCULO DEL INCREMENTO TOTAL POR OPCIONES DE COBERTURA
let incrementoTotal = 0;

const coberturas = ["Guardias", "Dentales", "Medicamentos", "Salud Mental", "Cirugías Plásticas", "Consultorios", "Análisis", "Rayos"];

for (const cobertura of coberturas) {
  let opcionSeleccionada = prompt(`Seleccione la opción para ${cobertura} (Ninguna, Simple, Completa): `);

  // VALIDACIÓN DE LA OPCIÓN SELECCIONADA
  while (!["Ninguna", "Simple", "Completa"].includes(opcionSeleccionada)) {
    opcionSeleccionada = prompt(`Opción inválida. Seleccione la opción para ${cobertura} (Ninguna, Simple, Completa): `);
  }

  // CALCULO DEL INCREMENTO PARA LA COBERTURA ACTUAL
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

// CALCULO DEL VALOR TOTAL DE LA COBERTURA
let valorTotal = precioInicial + incrementoTotal;

// MOSTRAR EL RESULTADO FINAL DEL PRECIO
console.log("**El valor total de la cobertura es de:**", valorTotal, "pesos.");

// Obtener el elemento HTML donde mostrar el resultado
const resultadoFinal = document.getElementById("resultado-final");

// Crear un nodo de texto con el valor total
const valorTotalTexto = document.createTextNode(`$${valorTotal}`);

// Insertar el nodo de texto dentro del elemento HTML
resultadoFinal.appendChild(valorTotalTexto);

// FIN 
