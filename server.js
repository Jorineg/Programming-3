// const express = require('express');
// const app = express();

import { setup, draw } from './game.js';

setup();

setInterval(() => {
    draw();
}, 100);
