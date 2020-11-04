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
const socketName = `${blue}publisher${reset}`;

(async () => {
    let socket: Zeromq.Socket = Zeromq.socket('pub');
    socket.bindSync(`tcp://127.0.0.1:${port}`);

    console.log(`${socketName} bound to port:`, port);
    console.log('');

    setInterval(() => {
        socket.send(['heartbeat', new Date().toISOString()]);
    }, 1000);

    setInterval(() => {
        socket.send([
            'channel.one',
            JSON.stringify({
                message: 'this is channel.one!',
                timestamp: new Date(),
            }),
        ]);
    }, 1500);
})();
