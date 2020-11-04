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
const socketName = `${blue}req${reset}`;

const times: number = 9;
const totalTimes: number = 3;
const delayMs: number = 5000;

(async () => {
    let socket: Zeromq.Socket = Zeromq.socket('req');
    socket.bindSync(`tcp://127.0.0.1:${port}`);

    console.log(`${socketName} bound to port: `, port);
    console.log('');

    for (let i = 0; i < totalTimes; i++) {
        console.log(`============#${i} start =============`);

        await req(socket, times);

        console.log(`============#${i} end =============`);
        console.log('');

        await delay(delayMs);
    }
})();

async function req(socket: Zeromq.Socket, times) {
    for (let i = 0; i < times; i++) {
        let a = Math.floor(Math.random() * 100);
        let b = Math.floor(Math.random() * 100);

        let res: any[] = await new Promise<any[]>((resolve, reject) => {
            socket.once('message', (rep, pid) => {
                return resolve([parseInt(rep), parseInt(pid)]);
            });

            console.log(`#${i} compute %s + %s ...`, a, b);
            socket.send([a, b]);
        });

        let answer: number = a + b;

        console.log(`[${yellow}${res[1]}${reset}] =`, res[0], `, ${green}${res[0] === answer}${reset}`);

        console.log('');
    }
}

async function delay(delayMs: number) {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            return resolve();
        }, delayMs);
    });
}
