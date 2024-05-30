import { setup, draw } from './game.js';
import { state } from './utils.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const express = require('express');

const app = express();
// use socket.io to send data to the client
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let intetval;

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        clearInterval(intetval);
    });

    setup();
    intetval = setInterval(() => {
        draw();
        socket.emit('matrix', transformMatrix(state.matrix));
    }, 30);
});


function transformMatrix(matrix) {
    return matrix.map(row => row.map(cell => cell.color || 'white'));
}

