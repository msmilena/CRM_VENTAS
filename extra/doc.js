/**Ventana ver producto */
function abrir() {
  document.getElementById("vent").style.display = "flex";
}
function cerrar() {
  document.getElementById("vent").style.display = "none";
}

/**Ventana Agregar stock */
function abrir_stock() {
  document.getElementById("vent_stock").style.display = "flex";
}
function cerrar_stock() {
  document.getElementById("vent_stock").style.display = "none";
}

/**Ventana Abrir empleado */
function abrir_empleado() {
  document.getElementById("vent_empleado").style.display = "flex";
}
function cerrar_empleado() {
  document.getElementById("vent_empleado").style.display = "none";
}

/**Ventana editar*/
function editar() {
  document.getElementById("vent_editar").style.display = "flex";
}
function cerrar_editar() {
  document.getElementById("vent_editar").style.display = "none";
  cerrar();
}

/**añadir nuevo*/
function abrir_nuevo() {
  document.getElementById("vent_nuevo").style.display = "flex";
}
function cerrar_nuevo() {
  document.getElementById("vent_nuevo").style.display = "none";

}

/*carrito*/
function abrircarrito() {
  document.getElementById("carrito").style.display = "flex";
}
function cerrarcarrito() {
  document.getElementById("carrito").style.display = "none";
}
/*Boleta*/
function abrircomprobante() {
  document.getElementById("boleta-comprobante").style.display = "flex";
}
function cerrarcomprobante() {
  document.getElementById("boleta-comprobante").style.display = "none";
}

/*Cotización*/
function abrircotizacion() {
  document.getElementById("boleta-cotizacion").style.display = "flex";
}
function cerrarcotizacion() {
  document.getElementById("boleta-cotizacion").style.display = "none";
}

/* Búsqueda */
var btn_expandir = document.querySelector(".texto_busqueda_avanzada");
var busqueda_avanzada = document.querySelector(".busqueda_avanzada");
if (btn_expandir && busqueda_avanzada) {
  btn_expandir.addEventListener("mousedown", function () {
    busqueda_avanzada.classList.toggle("hidden");
  });
}


