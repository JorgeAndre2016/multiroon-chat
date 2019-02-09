/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function () {
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

app.set('io', io) // sentando uma variável do tipo socket dentro do express

/* criar a conexão por websocket */
io.on('connection', function (socket) { // evento disparado quando usuário entra do chat
    console.log('Usuário conectou');

    socket.on('disconnect', function () { // evento disparado quando usuário sai do chat
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function (data) {

        /* dialogo */
        socket.emit(
            'mgsParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );
        socket.broadcast.emit(
            'mgsParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        /* participantes */

        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );
            socket.broadcast.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );
        }
    });
});