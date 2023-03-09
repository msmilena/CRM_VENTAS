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


function llenarCatalogo(respuesta) {
    tabla = document.getElementById("tabla_vendedorinv");
    tabla.innerHTML = "";
    tabla.innerHTML = "<th>Ver / Actualizar Stock</th><th></th><th>Nombre</th><th>ID</th><th>Stock</th><th>Precio</th>"
    for (i = 0; i < respuesta.length; i++) {
        filaproducto = '<tr><td><div class="opciones"><a onclick="javascript:obtieneVistaI(' + respuesta[i][0] + ')" class="boton ver" id="boton"><span class="icono"><img src="././static/resources/images/acercar.png"/></span></a></div></td><td><img class="img_miniatura" src="' + respuesta[i][4] + '" alt="" /></td><td>' + respuesta[i][1] + '</td><td>' + respuesta[i][0] + '</td><td>' + respuesta[i][2] + '</td><td>' + respuesta[i][3] + '</td>';
        tabla.innerHTML += filaproducto;
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
    document.getElementById("p_link").setAttribute('src',dicc["link"])
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