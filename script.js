document.addEventListener('DOMContentLoaded', (event) => {
  // Función para obtener datos del clima
  function fetchWeatherData() {
    const apiKey = '091ba4c21dacaba171c957cc66dbcc93'; // Nueva clave API
    const lat = -34.61315; // Latitud de Buenos Aires
    const lon = -58.37723; // Longitud de Buenos Aires
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=es`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        displayWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        const weatherDataContainer = document.getElementById('weatherData');
        weatherDataContainer.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
      });
  }

  // Función para mostrar los datos del clima
  function displayWeatherData(data) {
    const weatherDataContainer = document.getElementById('weatherData');
    weatherDataContainer.innerHTML = `
      <h3>Clima en Buenos Aires</h3>
      <p>Temperatura actual: ${data.current.temp} °C</p>
      <p>Humedad: ${data.current.humidity} %</p>
      <p>Descripción: ${data.current.weather[0].description}</p>
      <p>Temperatura máxima: ${data.daily[0].temp.max} °C</p>
      <p>Temperatura mínima: ${data.daily[0].temp.min} °C</p>
    `;
  }

  // Llamar a la función para obtener datos del clima cuando la página cargue
  fetchWeatherData();

  // Funciones de geolocalización y horas
  const openCageApiKey = 'e0b02918bc534c0e8f2bee17efa9b7ba';

  function getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.getElementById('geoData').innerHTML = "Geolocalización no es soportada por este navegador.";
    }
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${openCageApiKey}`)
      .then(response => response.json())
      .then(data => {
        const components = data.results[0].components;
        const locality = components.suburb || components.city || components.town || components.village || components.hamlet;
        const country = components.country;
        document.getElementById('geoData').innerHTML = `
          <h3><i class="fas fa-map-marker-alt location-icon"></i>Tu ubicación actual</h3>
          <p>${locality}, ${country}</p>
        `;
      })
      .catch(error => {
        document.getElementById('geoData').innerHTML = `
          <h3><i class="fas fa-map-marker-alt location-icon"></i>Tu ubicación actual</h3>
          <p>Latitud: ${lat}</p>
          <p>Longitud: ${lon}</p>
        `;
      });
  }

  function showError(error) {
    let errorMessage = '';
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "El usuario ha denegado la solicitud de geolocalización.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "La información de la ubicación no está disponible.";
        break;
      case error.TIMEOUT:
        errorMessage = "La solicitud de geolocalización ha caducado.";
        break;
      case error.UNKNOWN_ERROR:
        errorMessage = "Ha ocurrido un error desconocido.";
        break;
    }
    document.getElementById('geoData').innerHTML = errorMessage;
  }

  function showWorldClocks() {
    const cities = {
      'new-york-time': 'America/New_York',
      'london-time': 'Europe/London',
      'tokyo-time': 'Asia/Tokyo',
      'sydney-time': 'Australia/Sydney'
    };
    for (const [elementId, timeZone] of Object.entries(cities)) {
      const timeElement = document.getElementById(elementId);
      const now = new Date();
      const options = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      timeElement.textContent = `${timeZone.replace('_', ' ')}: ${now.toLocaleTimeString('en-US', options)}`;
    }
  }

  setInterval(showWorldClocks, 1000);
  getGeolocation();

  // Resto del código existente...
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

    localStorage.setItem('edad', edad);
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

  emailjs.init('mDrVPewzDYHwf84iL');

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
          Toastify({
            text: "Enviando mensaje...",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();

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

  botonCalcular.addEventListener('click', calcularValorTotal);
  crearDivsCoberturas();
  window.addEventListener('load', cargarDatosDesdeLocalStorage);
});






