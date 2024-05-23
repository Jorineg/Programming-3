// client side code
// use socket io to connect to the server and receive state
// state is a matrix of colors, should be getting displayed with p5.js

const socket = io('http://localhost:3000');

function setup() {
    createCanvas(1200, 800);
    const cellSize = 20;
    socket.on('matrix', (matrix) => {
        background(255);
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                fill(matrix[i][j]);
                rect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    });
}

