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

    socket.on('from_client', () => {
        console.log('Event coming form client');
    })

    setInterval(() => {
        socket.emit('from_server');
    }, 2000);
})

app.use('/', express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});
