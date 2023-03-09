consultaProductos();

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
    cards = document.getElementById("cards");
    console.log(respuesta.length);
    console.log(cards);
    cards.innerHTML = "";
    for (i = 0; i < respuesta.length; i++) {
        cardIndividual = `
            <div class="card">
                <img class="card__img" src="${respuesta[i][4]}" alt="" />
                <h3 class="card__titulo">${respuesta[i][1]}</h3>
                <h3 class="card__precio"> $ ${respuesta[i][3]}</h3>
                <a onclick="abrirDetalles(${respuesta[i][0]})" class="card__btn boton">Detalles</a>
            </div>`;
        cards.innerHTML += cardIndividual;
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
}



function abrirDetalles(id) {
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
            'oferta': intermedio[0][8]
        }

        entregaProducto(respuesta);
    }
}

function cerrar() {
    document.getElementById("vent").style.display = "none";
}