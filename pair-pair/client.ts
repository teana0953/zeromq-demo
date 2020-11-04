import * as Zeromq from 'zeromq';

const green = '\x1b[32m';
const blue = '\x1b[34m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const port = 3000;

const socketName: string = `${green}client${reset}`;

let socket: Zeromq.Socket = Zeromq.socket('pair');

socket.on('message', (msg) => {
    console.log(`[${socketName}] message received: ${msg.toString()}`);

    console.log(`[${socketName}] send message: pong`);

    socket.send(`[${socketName}] pong`);

    console.log('');
});

socket.connect(`tcp://127.0.0.1:${port}`);

console.log(`${socketName} client connect to ${port}...`);
console.log('');
