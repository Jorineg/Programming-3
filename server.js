const express = require('express');
const app = express();

const game = require('./game.js');

game.setup();

setInterval(() => {
    game.draw();
}, 1000);

