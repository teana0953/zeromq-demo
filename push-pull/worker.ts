import * as Process from 'process';
import * as Zeromq from 'zeromq';

const green = '\x1b[32m';
const brightBlue = '\x1b[94m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const port = 3000;

// push port
let portPush = 4000;

const processId = `${yellow}${Process.pid}${reset}`;

const socketName: string = `${green}worker${reset}`;

let socket: Zeromq.Socket = Zeromq.socket('pull');

socket.on('message', (a) => {
    console.log(`[${processId}] ${brightBlue}do ${a} and push response${reset}`);
    console.log('');

    pusher.send([`do ${a}`, Process.pid]);
});

socket.connect(`tcp://127.0.0.1:${port}`);

console.log('');
console.log(`${socketName} [${processId}] is running...`);
console.log('');

let pusher: Zeromq.Socket = Zeromq.socket('push');
pusher.connect(`tcp://127.0.0.1:${portPush}`);

console.log(`${socketName} bound to port:`, portPush);
console.log('');
