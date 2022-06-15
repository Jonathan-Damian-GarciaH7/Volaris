
document.getElementById('btnReservar').addEventListener('click', cargarJson);
let boton = document.getElementById("btnReservar");
function cargarJson(){

    fetch('./volaris.json')
      .then(function(res) {
          return res.json();
      })
      .then(function(data){
        let html = '';
        data.forEach(function(vuelos){
          html += ` <br>Profesional <br><li>${vuelos.origen}<br><li> ${vuelos.destino}<br> <li>${vuelos.valor}
          ;
          document.body.style.color = 'white';
          document.body.style.fontFamily = 'Plus Jakarta Sans';
  
            `
        })
        document.getElementById('resultado').innerHTML = html;
  
      })
  
  
  }
