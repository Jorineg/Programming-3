const utils = require('./utils.js');
const Empty = require('./empty.js');
let matrix = require('./game.js').matrix;

// GrassEater looks for grass in its neighbour cells.
// If it finds grass, it moves to that cell, eats the grass and gains 1 energy.
// If it doesn't find grass, it moves to a random empty neighbour cell and loses 1 energy.
// If it has 10 energy, it creates a new grass eater object in an empty neighbour cell
// and loses 5 energy.
// If it has 0 energy, it dies and becomes an empty cell.

module.exports = class GrassEater {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "yellow";
        this.energy = 5;
    }

    eat() {
        let grassFields = utils.findNeighbourPositions(this.row, this.col, 1, Grass);
        if (grassFields.length > 0) {
            let randomGrassField = utils.random(grassFields);
            utils.updateCreaturePosition(this, randomGrassField);
            this.energy++;
        } else {
            let emptyFields = utils.findNeighbourPositions(this.row, this.col, 1, Empty);
            if (emptyFields.length > 0) {
                let randomEmptyField = utils.random(emptyFields);
                utils.updateCreaturePosition(this, randomEmptyField);
            }
            this.energy--;
        }
    }

    multiply() {
        let freeFields = utils.findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let randomFreeField = utils.random(freeFields);
            let row = randomFreeField[0];
            let col = randomFreeField[1];
            matrix[row][col] = new GrassEater();
        }
    }

    step() {
        this.stepCount++;
        this.eat();
        if (this.energy >= 10) {
            this.multiply();
            this.energy -= 5;
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }
}