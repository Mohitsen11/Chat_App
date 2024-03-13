const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('send_msg', (data) => {
        console.log(data);
        
        // io.emit('msg_received', data); it emits the event to all the connections who are connected with websocket server

        // socket.emit('msg_received', data); it emits the event to the websocket connection who first published the event to server

        socket.broadcast.emit('msg_received', data);
    })
})

app.use('/', express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});
