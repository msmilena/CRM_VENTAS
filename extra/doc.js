/**Ventana ver producto */
function abrir() {
  document.getElementById("vent").style.display = "flex";
}
function cerrar() {
  document.getElementById("vent").style.display = "none";
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
