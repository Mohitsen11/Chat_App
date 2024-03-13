var socket = io();

let input = document.getElementById('newmsg');
let btn = document.getElementById('btn');
let msgList = document.getElementById('msglist');

btn.onclick = function exec() {
    socket.emit('send_msg', {
        msg: input.value
    });
}

socket.on('msg_received', (data) => {
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;
    msgList.appendChild(limsg);
})

console.log(socket);