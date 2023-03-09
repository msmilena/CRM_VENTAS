consultaProductos();

class detalleVenta{
    constructor(idproducto, cantidad, total, descripcion){
        this.idproducto = idproducto;
        this.idproducto = idproducto;
        this.idproducto = idproducto;
        this.idproducto = idproducto;
    }
}
var detalleVenta=[]
function consultaProductos() {
    url = '/productos';
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        respuesta = xhr.response;
        llenarCatalogo(respuesta);
    }
}

function llenarCatalogo(respuesta) {
    tabla = document.getElementById("tabla-vender");
    tabla.innerHTML = "";
    tabla.innerHTML = "<th>Ver / Añadir </th><th></th><th>Nombre</th><th>ID</th><th>Stock</th><th>Precio</th>"
    for (i = 0; i < respuesta.length; i++) {
        filaproducto = '<tr><td><div class="opciones"><a onclick="javascript:verProducto(' + respuesta[i][0] + ')" class="boton ver" id="boton"><span class="icono"><img src="././static/resources/images/acercar.png"/></span></a><a href="javascript:agregarCarrito(' + respuesta[i][0] + ')"class="boton agregar" id="boton"><span class="icono"><img src="././static/resources/images/mas.png"/></span></a></div></td><td><img class="img_miniatura" src="' + respuesta[i][4] + '" alt="" /></td><td>' + respuesta[i][1] + '</td><td>' + respuesta[i][0] + '</td><td>' + respuesta[i][2] + '</td><td>' + respuesta[i][3] + '</td>';
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

function verProducto(id) {
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
            'link':intermedio[0][9]
            
        }

        entregaProducto(respuesta);
    }

}
function agregarCarrito(id){
    var intermedio;
    url = '/productocarrito/' + id;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        intermedio = xhr.response;
        console.log(intermedio)
        llenarCarrito(intermedio)
    }
}

function llenarCarrito(respuesta){
    tabla = document.getElementById("tabla_carrito");
    //for (i = 0; i < respuesta.length; i++) {
        filaproducto = '<tr id="producto'+respuesta[0][0]+'"><td>'+respuesta[0][0]+'</td><td>'+respuesta[0][1]+'</td><td><button onclick=cambiarCantidad("+","producto'+respuesta[0][0]+'")>+</button><input value=1 style="width:20%"><button onclick=cambiarCantidad("-","producto'+respuesta[0][0]+'")>-</button></td><td>'+respuesta[0][2]+'</td><td>'+respuesta[0][2]+'</td></tr>';
        tabla.innerHTML += filaproducto;
    //}
}
function cambiarCantidad(simbolo, id){
    tabla=getElementById("tabla_carrito")
    fila=document.getElementById(id);
    if(simbolo=="+"){
        cantidad=fila.children[2].children[1].value
        fila.children[2].children[1].value=cantidad + 1
        precio=fila.children[4].textContent
        cantidad=parseFloat(cantidad)
        precio=parseFloat(precio)
        total=precio*cantidad
        fila.children[4].textContent=total
        calcularImportes()
    }
    if(simbolo=="-"){
        cantidad=fila.children[2].children[1].value
        if(cantidad==1){
           tabla.removeChild(fila.parentElement); 
        }else{
            fila.children[2].children[1].value=cantidad - 1
            precio=fila.children[4].textContent
            cantidad=parseFloat(cantidad)
            precio=parseFloat(precio)
            total=precio*cantidad
            fila.children[4].textContent=total
            calcularImportes()
        }
    }
}
function calcularImportes(){
    subtotal=document.getElementById("subtotal")
    descuento=document.getElementById("descuento")
    importe=document.getElementById("importe")
    let total=0
    tabla= document.getElementById("tabla_carrito");

    hijos= tabla.children.length;
    for(i=1; i<hijos; i++){
        precio= parseFloat(tabla.children[i].children[0].children[4].textContent)
        total= total + precio
    }
    total=parseInt(total);
    subtotal.textContent=total;
    descuento.textContent= 0;
    importe.textConten=total;

}
function obtenerDatosCarrito(){
    tabla = document.getElementById("tabla_carrito");
    detalleVenta = [];
    for(i=1; i<tabla.childElementCount; i++){
        id = tabla.children[i].children[0].children[0].textContent;
    } 
}
function generarVenta(){
    var opcion=document.getElementById("seleccionador_pago").value;
    //var idcliente=document.getElementById("idcliente").value;
    var idvendedor=document.getElementById("idvendedor").value;

}