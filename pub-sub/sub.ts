import * as Process from 'process';
import * as Zeromq from 'zeromq';

const green = '\x1b[32m';
const brightBlue = '\x1b[94m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const port = 3000;

const processId = `${yellow}${Process.pid}${reset}`;

const socketName: string = `${green}subscriber${reset}`;

let socket: Zeromq.Socket = Zeromq.socket('sub');

socket.on('message', (topic, data) => {
    switch (topic.toString()) {
        case 'heartbeat':
            console.log(`topic: ${topic}, data`, data.toString());
            break;
        case 'channel.one':
            console.log(`topic: ${topic}, data`, JSON.parse(data));
            break;
        default:
            console.log(`topic: ${topic}, data`, data);
            break;
    }

    console.log('');
});

socket.connect(`tcp://127.0.0.1:${port}`);

socket.subscribe('heartbeat');

socket.subscribe('channel.one');

console.log(`${socketName} connected to`, port);
console.log('');
