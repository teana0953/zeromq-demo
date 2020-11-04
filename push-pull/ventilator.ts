import * as Zeromq from 'zeromq';

const green = '\x1b[32m';
const blue = '\x1b[34m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const port = 3000;
const socketName = `${blue}ventilator${reset}`;

const times: number = 9;
const totalTimes: number = 3;
const delayMs: number = 5000;

(async () => {
    let socket: Zeromq.Socket = Zeromq.socket('push');
    socket.bindSync(`tcp://127.0.0.1:${port}`);

    console.log('');
    console.log(`${socketName} bound to port:`, port);
    console.log('');

    for (let i = 0; i < totalTimes; i++) {
        console.log(`============#${i} start =============`);

        await push(socket, times, i);

        console.log(`============#${i} end =============`);
        console.log('');

        await delay(delayMs);
    }
})();

async function push(socket: Zeromq.Socket, times: number, currentTimes: number) {
    for (let i = 0; i < times; i++) {
        console.log(`#${i}, ${currentTimes} push ...`);
        console.log('');

        socket.send([`#${i}, ${currentTimes} push`]);
    }
}

async function delay(delayMs: number) {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            return resolve();
        }, delayMs);
    });
}
