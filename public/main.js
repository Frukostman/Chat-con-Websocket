const socket = io.connect();

socket.on('mensajes', data => {
    render(data)
})

function render(data) {
    var html = data.map(function(elem, index) {
        return (`
        <div style="background-color: whitesmoke; padding: 10px; border-radius: 10px;">
            <div class="d-flex flex-row m-0 p-0">
                <strong>${elem.autor}  </strong>
                <p>:  ${elem.texto}</p>
                </div>
            <i style="font-size: small;" class="text-muted">${elem.fecha}</i>
        </div>`)
    }).join(" ");
    document.querySelector('#mensajes').innerHTML = html
}

function addMensaje(e) {
    var mensaje = {
        autor: document.querySelector("#username").value,
        texto: document.querySelector("#texto").value,
        fecha: new Date().toLocaleDateString()
    };
    socket.emit('mensajeNuevo', mensaje);
    document.querySelector("#texto").value = null
    return false
}

