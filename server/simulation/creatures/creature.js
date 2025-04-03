import { frameCount, findNeighbourPositions, random, updateCreaturePosition } from '../utils.js';
import Empty from './empty.js';
import { matrix } from '../initialization.js';

export default class Creature {
    constructor(energy, color) {
        this.stepCount = frameCount + 1;
        this.energy = energy;
        this.color = color;
    }

    multiply() {
        // Suche nach leeren Nachbarzellen
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        // Wenn es mindestens eine leere Zelle gibt,
        // wähle eine zufällige aus und erstelle ein neues Grasobjekt
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new this.constructor();
        }
    }

    findAndMoveToFood(food) {
        let foodFields = findNeighbourPositions(this.row, this.col, 1, food);
        if (foodFields.length > 0) {
            let randomFoodField = random(foodFields);
            updateCreaturePosition(this, randomFoodField);
            return true
        }
        return false
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }
}

