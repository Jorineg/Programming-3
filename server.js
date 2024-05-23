import { setup, draw } from './game.js';
import { state } from './utils.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const express = require('express');

const app = express();
// use socket.io to send data to the client
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

http.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

setup();

function transformMatrix(matrix) {
    return matrix.map(row => row.map(cell => cell.color || 'white'));
}

setInterval(() => {
    draw();
    io.emit('matrix', transformMatrix(state.matrix));
}, 30);
