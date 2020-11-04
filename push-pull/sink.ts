import * as Process from 'process';
import * as Zeromq from 'zeromq';

const green = '\x1b[32m';
const brightBlue = '\x1b[94m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

// pull port
const port = 4000;

const socketName: string = `${green}sink${reset}`;

let socket: Zeromq.Socket = Zeromq.socket('pull');

socket.on('message', (a, b) => {
    console.log(`[${yellow}${b}${reset}] is received ${brightBlue} '${a}'${reset}`);
    console.log('');
});

socket.bindSync(`tcp://127.0.0.1:${port}`);
console.log('');
console.log(`${socketName} bound to port`, port);
console.log('');
