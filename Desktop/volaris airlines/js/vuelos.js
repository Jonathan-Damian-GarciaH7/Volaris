let app = new function() {
        let vuelo1 = {
          origen: "EZEIZA",
          destino: "CORDOBA",
          hora: new Date(2022, 8, 15, 08),
          costobase: 4000,
          costoneto: 0,
          reservas: []
        };
        let vuelo2 = {
          origen: "EZEIZA",
          destino: "BARILOCHE",
          hora: new Date(2022, 7, 28, 19, 30),
          costobase: 7000,
          costoneto: 0,
          reservas: []
        };
        let vuelo3 = {
          origen: "EZEIZA",
          destino: "JUJUY",
          hora: new Date(2022, 7, 21, 18,20),
          costobase: 5000,
          costoneto: 0,
          reservas: []
        };
        let vuelo4 = {
          origen: "EZEIZA",
          destino: "CALAFATE",
          hora: new Date(2022, 6, 29, 5, 50),
          costobase: 8500,
          costoneto: 0,
          reservas: []
        };
        let vuelo5 = {
          origen: "EZEIZA",
          destino: "IGUAZU",
          hora: new Date(2022, 8, 7, 11, 30),
          costobase: 5000,
          costoneto: 0,
          reservas: []
        };

        this.vuelos = [vuelo1, vuelo2, vuelo3, vuelo4, vuelo5];
        for (let i = 0; i < this.vuelos.length; i++) {
          let iva = this.vuelos[i].costobase*0.21 ; //calculo de iva
          let tasas = this.vuelos[i].costobase*0.15; //calculo de tasas
          

          this.vuelos[i].costoneto = this.vuelos[i].costobase + iva + tasas;
        }
  
        this.mostrarVuelos = function() {   //informacion de vuelos. formato,hora,minutos.
          let data = '<br>';
          if (this.vuelos.length > 0) {
            for (i = 0; i < this.vuelos.length; i++) {
              let hora = this.vuelos[i].hora.getHours() < 10 ? '0' + this.vuelos[i].hora.getHours() : this.vuelos[i].hora.getHours(); //formato de hora y minutos.
              let minutos = this.vuelos[i].hora.getMinutes() < 10 ? '0' + this.vuelos[i].hora.getMinutes() : this.vuelos[i].hora.getMinutes();
              data += '<tr>';
              data += '<td>Vuelo # '+ (i+1) + ' ORIGEN: ' + this.vuelos[i].origen + ', DESTINO: ' + this.vuelos[i].destino + ', SALIDA: ' + this.vuelos[i].hora.toLocaleDateString() + " " + hora + ":" + minutos + "HS."+'</td>';  //formato de fecha.
              data += '<td><button onclick="app.Reservar(' + i + ')">Reservar</button></td>';
              data += '</tr>';
            }
          }
          document.getElementById('vuelos').innerHTML = data;
          document.getElementById('vuelos').style.display = 'block';
        };

        this.Reservar = function (item) {
          let el = document.getElementById('documento');
          document.getElementById('documento').value = "";
          document.getElementById('datosvuelo').style.display = 'block';
          document.getElementById('vuelos').style.display = 'none';
          document.getElementById('menu1').style.display = 'none';
          document.getElementById('menu2').style.display = 'none';
          document.getElementById('btnback').style.display = 'block';

          let impuesto = this.vuelos[item].costobase == this.vuelos[item].costoneto ? '' : 'Impuesto IVA+Tasas.'; 
          let hora = this.vuelos[item].hora.getHours() < 10 ? '0' + this.vuelos[item].hora.getHours() : this.vuelos[item].hora.getHours();
          let minutos = this.vuelos[item].hora.getMinutes() < 10 ? '0' + this.vuelos[item].hora.getMinutes() : this.vuelos[item].hora.getMinutes();

          document.getElementById('datosvuelo').innerHTML = "VUELO # " + (item + 1) + ":<br>ORIGEN: " + this.vuelos[item].origen + '<br>DESTINO: ' + this.vuelos[item].destino + '<br>SALIDA: ' + this.vuelos[item].hora.toLocaleDateString() + " " + hora + ":" + minutos + '<br>PRECIO BASE: $' + this.vuelos[item].costobase + '<br>PRECIO NETO: $' + this.vuelos[item].costoneto + " " + impuesto;
          document.getElementById('campodoc').style.display = 'block';
          self = this;
          document.getElementById('reserva-edit').onsubmit = function() {
            let d = el.value * 1;
            if (isNaN(d) || d == 0) {        //restriccion
              Swal.fire({
                icon: 'error',
                title: 'Ingrese un dato correcto',
              });
            }else{
              let flag = false;
              for (j = 0; j < self.vuelos.length; j++) {
                let auxDoc = self.vuelos[j].reservas.indexOf(d)
                if (auxDoc != -1) {
                  if (self.vuelos[j].hora.getFullYear() == self.vuelos[item].hora.getFullYear() &&
                    self.vuelos[j].hora.getMonth() == self.vuelos[item].hora.getMonth() &&
                    self.vuelos[j].hora.getDate() == self.vuelos[item].hora.getDate()) {
                    flag = true;
                    break;
                  }
                } 
              }
              if (flag) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Error: usted ya tiene reservado un vuelo para esta fecha',
                });
              }else{
                self.vuelos[item].reservas.push(d);
                Swal.fire({
                  icon: 'success',
                  title: 'Vuelo reservado correctamente!',
                })
                document.getElementById('menu1').style.display = 'block';
                document.getElementById('menu2').style.display = 'block';
                document.getElementById('datosvuelo').style.display = 'none';
                document.getElementById('campodoc').style.display = 'none';
                document.getElementById('btnback').style.display = 'none';
              }
            }
          }
        };

        this.consultarReserva = function () {
          let el = document.getElementById('docConsulta');
          let d = el.value * 1;
          if (isNaN(d) || d == 0) {   //restriccion consultar reservas
            Swal.fire({
              icon: 'error',
              title: 'Ingrese un dato correcto',
            });
          }else{
            let data = '<br>VUELOS RESERVADOS DE ' + d; //agregar nombre de persona
            for (i = 0; i < this.vuelos.length; i++) {
              let auxDoc = this.vuelos[i].reservas.indexOf(d)
              if (auxDoc != -1) {
                let hora = this.vuelos[i].hora.getHours() < 10 ? '0' + this.vuelos[i].hora.getHours() : this.vuelos[i].hora.getHours();
                let minutos = this.vuelos[i].hora.getMinutes() < 10 ? '0' + this.vuelos[i].hora.getMinutes() : this.vuelos[i].hora.getMinutes();
                data += '<tr>';
                data += '<td>Vuelo # '+ (i+1) + "= ORIGEN: " + this.vuelos[i].origen + ', DESTINO: ' + this.vuelos[i].destino + ', SALIDA: ' + this.vuelos[i].hora.toLocaleDateString() + " " + hora + ":" + minutos + " HS."+ '</td>';
                data += '</tr>';
              }
            }
            if (data == '<br>VUELOS RESERVADOS DE ' + d) {
              Swal.fire({
                icon: 'warning',
                title: 'No existen vuelos asociados a dicho documento',
              });
            }else{
              document.getElementById('menu1').style.display = 'none';
              document.getElementById('menu2').style.display = 'none';
              document.getElementById('vuelos').style.display = 'block';
              document.getElementById('vuelos').innerHTML = data;
              document.getElementById('btnback').style.display = 'block';
            }
          }
        };

        this.Volver = function (){
          document.getElementById('datosvuelo').style.display = 'none';
          document.getElementById('campodoc').style.display = 'none';
          document.getElementById('vuelos').style.display = 'none';
          document.getElementById('btnback').style.display = 'none';
          document.getElementById('menu1').style.display = 'block';
          document.getElementById('menu2').style.display = 'block';
          document.getElementById('docConsulta').value = "";
        };
}