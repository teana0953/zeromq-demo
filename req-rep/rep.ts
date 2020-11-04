import * as Process from 'process';
import * as Zeromq from 'zeromq';

const green = '\x1b[32m';
const brightBlue = '\x1b[94m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const port = 3000;

const processId = `${yellow}${Process.pid}${reset}`;

const socketName: string = `${green}rep${reset}`;

let socket: Zeromq.Socket = Zeromq.socket('rep');

socket.on('message', (a, b) => {
    console.log(`[${processId}] ${brightBlue}compute %s + %s and send response${reset}`, a, b);
    console.log('');

    let sum = parseInt(a) + parseInt(b);

    socket.send([sum, Process.pid]);
});

socket.connect(`tcp://127.0.0.1:${port}`);

console.log(`${socketName} worker ${processId} is running...`);
console.log('');
