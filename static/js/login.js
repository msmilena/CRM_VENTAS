function login(){
    let user=document.getElementById("usuario").value;
    let pssw=document.getElementById("contrasenia").value;
    let cadena=user+","+pssw;
    url = '/procesa_login/' + cadena;
    xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    let bodys = JSON.stringify({
        'cadena': cadena,
    });
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
            console.log(JSON.parse(xhr.responseText));
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
    xhr.send(bodys);
    //xhr.onload = function() {

    //    console.log("to gucci");
    //}
   
}