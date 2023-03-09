consultaProductos();
//obtieneVistaI(100);

//FUNCIONES DE EJEMPLO
function consultaProductos() {
    url = '/productos';
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        respuesta = xhr.response;
        llenarCatalogo(respuesta);
        
        asignarMaximos();
    }
}
function asignarMaximos(){
    
    url = '/maximos';
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        respuesta = xhr.response;
        console.log(respuesta)
        document.getElementById("filtro_ram").textContent="RAM: [Hasta"+respuesta[0][1]+"GB]";
        document.getElementById("filtro_camara").textContent="Cámara: [Hasta"+respuesta[0][0]+"px]";
    }
}
function llenarCatalogo(respuesta) {
    tabla = document.getElementById("tabla_admin");
    tabla.innerHTML = "";
    tabla.innerHTML = "<th>Ver / Actualizar Stock</th><th></th><th>Nombre</th><th>ID</th><th>Stock</th><th>Precio</th>"
    for (i = 0; i < respuesta.length; i++) {
        filaproducto = '<tr><td><div class="opciones"><a onclick="javascript:obtieneVistaI(' + respuesta[i][0] + ')" class="boton ver" id="boton"><span class="icono"><img src="././static/resources/images/acercar.png"/></span></a><a href="javascript:abrir_stock(' + respuesta[i][0] + ')"class="boton agregar" id="boton"><span class="icono"><img src="././static/resources/images/icono-actualizar-stock.png"/></span></a><a href="javascript:eliminarProducto(' + respuesta[i][0] + ')"class="boton agregar" id="boton"><span class="icono"><img src="././static/resources/images/borrar.png"/></span></a></div></td><td><img class="img_miniatura" src="' + respuesta[i][4] + '" alt="" /></td><td>' + respuesta[i][1] + '</td><td>' + respuesta[i][0] + '</td><td>' + respuesta[i][2] + '</td><td>' + respuesta[i][3] + '</td>';
        tabla.innerHTML += filaproducto;
    }
}
//FIN FUNCIONES DE EJEMPLO
function eliminarProducto(id){
    var intermedio;
    url = '/eliminarProducto/' + id;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        intermedio = xhr.response;
        alert("Producto de ID"+id+" eliminado");
        consultaProductos();
    }
}
function abrir_stock(id) {
    document.getElementById("vent_stock").style.display = "flex";
    var intermedio;
    url = '/consultarStock/' + id;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        intermedio = xhr.response;
        document.getElementById("stock_actual").textContent="Stock actual: "+intermedio[0][0];
        document.getElementById("id_stock_producto").value=id;
    }
}
function actualizarStock(){
    stock=document.getElementById("nuevo_stock").value;
    id=document.getElementById("id_stock_producto").value;
    if(stock==""||stock==null){
        alert("Ingrese primero un stock válido");
        return;
    }
    data = {
        id_producto: id,
        stock: stock
    }
    let cuerpo = JSON.stringify(data);
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/actualizarStock");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(cuerpo);
    xhr.onload = function() {
        respuesta = xhr.response;
        document.getElementById("vent_stock").style.display = "none";
        consultaProductos();
        document.getElementById("id_stock_producto").value=""
        document.getElementById("stock_actual").textContent="Stock actual: ";
    }
}

function entregaProducto(dicc) {
    document.getElementById("p_nombre").innerHTML = dicc["equipo"]
    document.getElementById("p_descripcion").innerHTML = dicc["descripcion"]
    document.getElementById("p_garantia").innerHTML = dicc["garantia"]
    document.getElementById("p_plan").innerHTML = dicc["plan"]
    document.getElementById("p_accesorio").innerHTML = dicc["accesorio"]
    document.getElementById("p_oferta").innerHTML = dicc["oferta"]
    document.getElementById("p_precio").innerHTML = dicc["precio"]
    document.getElementById("p_stock").innerHTML = dicc["stock"]
    document.getElementById("foto_pr").setAttribute('src',dicc["link"])
}

function obtieneVistaI(id) {
    document.getElementById("vent").style.display = "flex";
    var intermedio;
    url = '/back/inventario_admi_producto/' + id;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        intermedio = xhr.response;

        let respuesta = {
            'stock': intermedio[0][0],
            'id': intermedio[0][1],
            'precio': intermedio[0][2],
            'equipo': intermedio[0][3],
            'descripcion': intermedio[0][4],
            'garantia': intermedio[0][5],
            'plan': intermedio[0][6],
            'accesorio': intermedio[0][7],
            'oferta': intermedio[0][8],
            'link': intermedio[0][9]
        }

        entregaProducto(respuesta);
    }

}

const inputEquipo = document.getElementById('idequipo');

inputEquipo.addEventListener('input', function() {
    console.log(inputEquipo.value);
    cambioEquipo(inputEquipo.value);
});

function cambioEquipo(id) {
    url = '/back/inventario_admi_producto/' + id;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        intermedio = xhr.response;
        document.getElementById("nombre_equipo").value = intermedio[0][3];
        document.getElementById("descripcion_equipo").value = intermedio[0][4];
        document.getElementById("garantia_equipo").value = intermedio[0][5];
        document.getElementById("plan_equipo").value = intermedio[0][6];
        document.getElementById("accesorio_equipo").value = intermedio[0][7];

    }
}

function guardarProducto() {
    equipo_id = document.getElementById("idequipo").value;
    oferta_id = document.getElementById("idoferta").value;
    if (equipo_id == "" || equipo_id == null) {
        alert("Falta ingresar id de equipo");
        return;
    }
    if (oferta_id == "" || oferta_id == null) {
        alert("Falta ingresar id de oferta");
        return;
    }
    insertarProducto(equipo_id, oferta_id);
}

function insertarProducto(idequipo, idoferta) {
    data = {
        id_equipo: idequipo,
        id_oferta: idoferta
    };
    let cuerpo = JSON.stringify(data);
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/crearproducto");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(cuerpo);
    xhr.onload = function() {
        respuesta = xhr.response;
        alert(respuesta);
        document.getElementById("vent_nuevo").style.display = "none";
        consultaProductos();
    }
}

