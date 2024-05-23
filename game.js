import { state, size, blockSize, updateCreaturePosition, findNeighbourPositions, random } from './utils.js';
import Empty from './empty.js';
import Grass from './grass.js';
import GrassEater from './grassEater.js';
import MeatEater from './meatEater.js';

const creatureAmounts = [
    [Grass, 0.4],
    [GrassEater, 0.02],
    [MeatEater, 0.02],
];

const colorMap = {
    black: "\x1b[30m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    reset: "\x1b[0m",
};

let currentColor = colorMap.black;

function getRandomCreature() {
    let rand = random();
    let sum = 0;
    for (let [creatureClass, probability] of creatureAmounts) {
        sum += probability;
        if (rand < sum) {
            return creatureClass;
        }
    }
    return Empty;
}

function fillRandomMatrix() {
    for (let row = 0; row < size; row++) {
        state.matrix.push([]);
        for (let col = 0; col < size; col++) {
            let creatureClass = getRandomCreature();
            state.matrix[row][col] = new creatureClass();
        }
    }
}

function setup() {
    fillRandomMatrix();
}

function draw() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            let obj = state.matrix[row][col];
            obj.row = row;
            obj.col = col;

            fill(obj.color);
            //    rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);

            if (obj instanceof Empty) continue;
            obj.step();
        }
        //process.stdout.write('\n');
    }
    //process.stdout.write('\x1b[' + size + 'A');
    fill('reset');
    state.frameCount++;
}

function fill(color) {
    if (color === undefined) color = 'black';
    process.stdout.write(colorMap.reset);
    currentColor = colorMap[color];
    process.stdout.write(currentColor);
}

function rect(x, y, w, h) {
    if (currentColor === colorMap.black) {
        process.stdout.write(' ');
        return;
    }
    process.stdout.write('X');
}

export { setup, draw };
