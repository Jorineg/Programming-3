const utils = require('./utils.js');
let matrix = require('./game.js').matrix;

// Grass starts with a random energy between 0 and 2.
// It gains 1 energy every frame.
// When it reaches 7 energy, it creates a new grass object
// in an empty neighbour cell and resets its energy to 0.
module.exports = class Grass {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "green";
        this.energy = int(random(0, 3));
    }

    step() {
        this.stepCount++;
        this.energy++;
        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        let emptyFields = utils.findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let randomEmptyField = utils.random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new Grass();
        }
    }
}