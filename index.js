const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const chat = require('./models/chat-model');

const http = require('http');
const { Server } = require('socket.io');

const connect = require('./config/database-config');
const Chat = require('./models/chat-model');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('join_room' , (data) => {
        console.log('Joined a room ', data.roomId); 
        socket.join(data.roomId);
    })

    socket.on('send_msg', async (data) => {
        console.log(data);
        
        // io.emit('msg_received', data); it emits the event to all the connections who are connected with websocket server

        // socket.emit('msg_received', data); it emits the event to the websocket connection who first published the event to server

        const chat = await Chat.create({
            roomId: data.roomId,
            user: data.username,
            content: data.msg
        });

        io.to(data.roomId).emit('msg_received', data);
    })

    socket.on('typing', (data) => {

        socket.broadcast.to(data.roomId).emit('show_typing', data);
    })
})

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomId', async (req, res) => {
    const chat = await Chat.find({
        roomId: req.params.roomId
    }).select('content user');

    // console.log(chat);

    res.render('index', {
        roomId: req.params.roomId,
        chat: chat
    });
});

server.listen(PORT, async () => {
    console.log(`Server is running at PORT:${PORT}`);
    await connect();

    console.log('Database is connected');
});
