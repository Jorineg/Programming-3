const utils = require('./utils.js');

// list of lists. Contains all creatures.
matrix = [];
// size of the matrix, how many cells in width and height
let size = 5;
// display size in pixels of each cell
let blockSize = 15;

// What probability each creature has to be created
let creatureAmounts = [
    [Grass, 0.25],
    [GrassEater, 0.05],
    [MeatEater, 0.02],
];

let colorMap = {
    "black": "\x1b[30m",
    "green": "\x1b[32m",
    "yellow": "\x1b[33m",
    "red": "\x1b[31m",
    "reset": "\x1b[0m"
}

let currentColor = colorMap["black"];

// Choose a random creature based on the probabilities
function getRandomCreature() {
    let rand = utils.random();
    let sum = 0;
    for (let [creatureCLass, propability] of creatureAmounts) {
        sum += propability;
        if (rand < sum) {
            return creatureCLass;
        }
    }
    return Empty;
}

// randomly fill the matrix with creatures based on the probabilities
function fillRandomMatrix() {
    for (let row = 0; row < size; row++) {
        matrix.push([]);
        for (let col = 0; col < size; col++) {
            let creatureCLass = getRandomCreature();
            matrix[row][col] = new creatureCLass();
        }
    }
}




// setup the canvas and fill the matrix with creatures
// Will be called once at the start
function setup() {
    // createCanvas(size * blockSize, size * blockSize);
    fillRandomMatrix();
    // noStroke();
    // frameRate(1);
}

// game loop. This will be called every frame
// It will draw the matrix and update the creatures
function draw() {
    // background(200)
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            let obj = matrix[row][col];

            // skip empty cells
            if (obj instanceof Empty) continue;

            // set the row and col of the creature
            obj.row = row;
            obj.col = col;

            // draw the creature
            fill(obj.color);
            rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);

            // this prevents newly created creatures from being updated in the same step
            // and creatures that move from being updated multiple times in one frame
            if (obj.stepCount === frameCount) {
                obj.step();
            }
        }
        process.stdout.write('\n');
    }
}

// set console color to color
function fill(color) {
    process.stdout.write(colorMap["reset"]);
    currentColor = colorMap[color];
    process.stdout.write(currentColor);
}

function rect(x, y, w, h) {
    if (currentColor === colorMap["black"]) return;
    process.stdout.write('X');
}

module.exports = {
    setup,
    draw,
    matrix
};