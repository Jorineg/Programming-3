import Empty from './empty.js';
import { state, findNeighbourPositions, random } from './utils.js';

class Grass {
    constructor() {
        this.stepCount = state.frameCount + 1;
        this.color = 'green';
        this.energy = Math.floor(random(0, 3));
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
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            state.matrix[row][col] = new Grass();
        }
    }
}

export default Grass;
