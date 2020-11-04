/**
 * reference
 * http://blog.ez2learn.com/2011/12/31/transport-lib-of-new-era-zeromq/
 */

import * as Zeromq from 'zeromq';

const green = '\x1b[32m';
const blue = '\x1b[34m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const port = 3000;
const socketName = `${blue}server${reset}`;

const delayMs: number = 5000;

(async () => {
    let socket: Zeromq.Socket = Zeromq.socket('pair');

    socket.on('message', (msg) => {
        console.log(`[${socketName}] message received: ${msg.toString()}`);
        console.log('');
    });

    socket.bindSync(`tcp://127.0.0.1:${port}`);

    console.log(`${socketName} bound to port ${port}`);
    console.log('');

    setInterval(() => {
        console.log(`[${socketName}] send message: ping`);

        socket.send(`[${socketName}] ping`);
    }, delayMs);
})();
