const edadForm = document.getElementById('edad-form');
const resultadoFinal = document.getElementById('resultado-final');
const coberturasContainer = document.getElementById('coberturas-container');
const botonCalcular = document.querySelector('.btn');
const coberturas = ["Guardias", "Dentales", "Medicamentos", "Salud Mental", "Cirugías Plásticas", "Consultorios", "Análisis", "Rayos"];

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

// Obtener elementos del modal
const modal = document.getElementById("modal");
const cerrar = document.getElementsByClassName("cerrar")[0];

function mostrarModal() {
  modal.style.display = "block";
}

cerrar.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function guardarCoberturasEnLocalStorage() {
  const coberturasSeleccionadas = {};
  for (const cobertura of coberturas) {
    const opcionSeleccionada = document.querySelector(`select[data-cobertura="${cobertura}"]`).value;
    coberturasSeleccionadas[cobertura] = opcionSeleccionada;
  }
  localStorage.setItem('coberturas', JSON.stringify(coberturasSeleccionadas));
}

function cargarDatosDesdeLocalStorage() {
  const edad = localStorage.getItem('edad');
  if (edad) {
    document.getElementById('edad-input').value = edad;
  }

  const coberturasSeleccionadas = JSON.parse(localStorage.getItem('coberturas'));
  if (coberturasSeleccionadas) {
    for (const cobertura of coberturas) {
      const select = document.querySelector(`select[data-cobertura="${cobertura}"]`);
      if (select) {
        select.value = coberturasSeleccionadas[cobertura];
      }
    }
  }
}

function calcularValorTotal() {
  const edadInput = document.getElementById('edad-input');
  let edad = parseInt(edadInput.value);

  if (isNaN(edad) || edad < 0 || edad > 60) {
    Swal.fire({
      title: 'Edad inválida',
      text: 'Debes ingresar una edad válida entre 0 y 60.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Almacenar la edad en localStorage
  localStorage.setItem('edad', edad);

  // Guardar las coberturas en localStorage
  guardarCoberturasEnLocalStorage();

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

  let detalleCoberturas = "";
  for (const cobertura of coberturas) {
    const opcionSeleccionada = document.querySelector(`select[data-cobertura="${cobertura}"]`).value;
    detalleCoberturas += `<div>${cobertura}: ${opcionSeleccionada}</div>`;
  }

  Swal.fire({
    title: `<div style="text-align: center; font-size: 24px; animation: heartBeat 1s infinite;">El valor de la cobertura seleccionada es: $${valorTotal}</div>`,
    html: `<div style="text-align: justify;">Detalle de coberturas:</div>${detalleCoberturas}`,
    icon: 'info',
    confirmButtonText: 'Aceptar',
    showCancelButton: true,
    cancelButtonText: 'Contáctame',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.cancel) {
      mostrarFormularioContacto(detalleCoberturas);
    }
  });
}

// Función mostrarFormularioContacto 
// Inicializa EmailJS con tu clave de servicio (agrega esto al inicio del script)
emailjs.init('mDrVPewzDYHwf84iL');

// Función mostrarFormularioContacto 
// Función mostrarFormularioContacto 
function mostrarFormularioContacto(detalleCoberturas) {
  const coberturasPorDefecto = ['Guardias', 'Dentales', 'Medicamentos', 'Salud Mental', 'Cirugías Plásticas', 'Consultorios', 'Análisis', 'Rayos'];
  let mensaje = 'Me interesa que se comuniquen conmigo a la brevedad, estoy interesado en el servicio de coberturas médicas +Salud, en particular quiero información por el siguiente listado de coberturas:\n\n';

  for (const cobertura of coberturasPorDefecto) {
    const opcionSeleccionada = document.querySelector(`select[data-cobertura="${cobertura}"]`).value;
    mensaje += `${cobertura}: ${opcionSeleccionada}\n`;
  }

  const formularioHTML = `
    <form id="contact-form">
      <div class="form-group">
        <label for="from_name">Nombre:</label>
        <input type="text" class="form-control" id="from_name" name="from_name" placeholder="Ingresa tu nombre">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" name="email" placeholder="Ingresa tu email">
      </div>
      <div class="form-group">
        <label for="message">Mensaje:</label>
        <textarea class="form-control" id="message" name="message" rows="12" placeholder="Ingresa tu mensaje">${mensaje}</textarea>
      </div>
    </form>
  `;

  Swal.fire({
    title: 'Formulario de Contacto',
    html: formularioHTML,
    confirmButtonText: 'Enviar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const form = document.getElementById('contact-form');
      if (!form.from_name.value || !form.email.value || !form.message.value) {
        Swal.showValidationMessage('Por favor, completa todos los campos');
      } else {
        // Mostrar notificación de Toastify cuando se está enviando el mensaje
        Toastify({
          text: "Enviando mensaje...",
          duration: 3000,
          close: true,
          gravity: "top", // top or bottom
          position: "right", // left, center or right
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();

        // Enviar el formulario usando EmailJS
        return emailjs.sendForm('default_service', 'template_vedrbli', form)
          .then(() => {
            Swal.fire({
              title: '¡Mensaje enviado con éxito!',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          })
          .catch(error => {
            Swal.fire({
              title: 'Error al enviar el mensaje',
              text: 'Por favor, inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.error('Error al enviar el mensaje:', error);
          });
      }
    }
  });
}





// Evento para el cálculo del valor total
botonCalcular.addEventListener('click', calcularValorTotal);

// Crear los divs con listas desplegables al cargar la página
crearDivsCoberturas();

// Cargar datos desde localStorage al cargar la página
window.addEventListener('load', cargarDatosDesdeLocalStorage);
