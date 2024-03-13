var socket = io();

let btn = document.getElementById('btn');

btn.onclick = function exec() {
    socket.emit('from_client');
}

socket.on('from_server', () => {
    console.log('New event is coming from the servers end');
    const div = document.createElement('div');
    div.innerText = 'New message event from server';

    document.body.appendChild(div);
})

console.log(socket);