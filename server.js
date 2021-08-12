const express = require('express');
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/public'))

let mensajes = [];

 io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('mensajes', mensajes);

    socket.on('mensajeNuevo', function(data) {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    });

    });


server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
})
