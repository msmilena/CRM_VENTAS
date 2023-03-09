consultaEmpleados()

function consultaEmpleados() {
    url = '/empleados';
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        respuesta = xhr.response;
        console.log(respuesta);
        llenarEmpleado(respuesta);
    }
}

function llenarEmpleado(respuesta) {
    tabla = document.getElementById("tabla_empleados");
    tabla.innerHTML = "";
    tabla.innerHTML = "<th>Ver</th><th>Nombre</th><th>ID</th><th>Usuario</th><th>Ventas</th>"
    for (i = 0; i < respuesta.length; i++) {
        filaempleado = `<tr><td><div class="opciones"><a href="javascript:abrir_empleado(`+respuesta[i][0]+`)" class="boton ver" id="boton"><span class="icono"><img src="././static/resources/images/acercar.png" alt="" /></span></a>
        </div></td><td>` + respuesta[i][1].toUpperCase() + `</td><td>` + respuesta[i][0] + `</td><td>`+ respuesta[i][2].toUpperCase() + `</td><td>`+ respuesta[i][3] + `</td>`;
        tabla.innerHTML += filaempleado;
    }
}
function cerrar_nuevo_empleado(){
    document.getElementById("vent_nuevo_empleado").style.display = "none";
}

function nuevoEmpleado(){
    document.getElementById("vent_nuevo_empleado").style.display = "flex";
}
function guardarEmpleado(){
    nombre=document.getElementById("nuevo_nombre").value
    usuario=document.getElementById("nuevo_usuario").value
    contrasenia=document.getElementById("nuevo_contraseña").value
    if(nombre==""||nombre==null){
        alert("Ingrese un nombre válido");
        return;
    }
    if(usuario==""||usuario==null){
        alert("Ingrese un usuario válido");
        return;
    }
    if(contrasenia==""||contrasenia==null){
        alert("Ingrese una contrasenia válida");
        return;
    }
    data = {
        usuario: usuario,
        nombre: nombre,
        contrasenia: contrasenia
    };
    let cuerpo = JSON.stringify(data);
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/crearvendedor");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(cuerpo);
    xhr.onload = function() {
        respuesta = xhr.response;
        alert(respuesta);
        document.getElementById("vent_nuevo_empleado").style.display = "none";
        consultaEmpleados();
    }
}  

function abrir_empleado(id){
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
//id_venta, monto, forma_pagi, fecha
function llenarVentas(respuesta){
    document.getElementById("vent_empleado").style.display = "flex";
    tabla = document.getElementById("ventas_empleado");
    tabla.innerHTML = "";
    tabla.innerHTML = "<tr><th>ID</th><th>Monto</th><th>Forma Pago</th><th>Fecha</th></tr>"
    if(respuesta.length>0){
        document.getElementById("ventas_empleado").style.overflow = "scroll";
        for (i = 0; i < respuesta.length; i++) {
            filaempleado = `<tr>
            <td>`+respuesta[i][0]+`</td>
            <td>`+respuesta[i][1]+`</td>
            <td>`+respuesta[i][2]+`</td>
            <td>`+respuesta[i][3]+`</td>
          </tr>`;
            tabla.innerHTML += filaempleado;
        }
    }else{
        tabla.innerHTML+="<tr><td colspan='4'>No existen registros de ventas</td></tr>"
    }
    
}