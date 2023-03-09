abrir_empleado('112');
function abrir_empleado(id) {
    url = '/ventas/'+id;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        respuesta = xhr.response;
        console.log(respuesta);
        llenarVentas(respuesta);
    }
}

function llenarVentas(respuesta){
    tabla = document.getElementById("tabla-ventas");
    tabla.innerHTML = " ";
    tabla.innerHTML = "<tr><th>ID</th><th>Fecha</th><th>Forma Pago</th><th>Monto</th></tr>"
    if(respuesta.length>0){
        document.getElementById("tabla-ventas").style.overflow = "scroll";
        for (i = 0; i < respuesta.length; i++) {
            filaempleado = `<tr><td>`+ respuesta[i][0] +`</td><td>`+respuesta[i][3]+`</td><td>`+ respuesta[i][2] +`</td><td>`+respuesta[i][1]+`</td></tr>`;
            tabla.innerHTML += filaempleado;
        }
    }else{
        tabla.innerHTML+="<tr><td colspan='4'>No existen registros de ventas</td></tr>"
    }
    
}