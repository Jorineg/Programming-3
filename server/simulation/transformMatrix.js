import Empty from './creatures/empty.js';
import Grass from './creatures/grass.js';
import GrassEater from './creatures/grasseater.js';
import MeatEater from './creatures/meateater.js';

import { matrix } from './initialization.js';

// Diese Funktion sorgt dafür, dass die Matrix nur noch Strings mit Farben enthält
export function getTransformedMatrix() {
    // Wenn ihr Zahlen in der Matrix habt, können sie hier in Farben umgewandelt werden
    // ...
    let transform = [
        [Grass, 'green'],
        [GrassEater, 'yellow'],
        [MeatEater, 'red'],
        [Empty, 'white']
    ]
    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            let creature = matrix[i][j];
            for (let k = 0; k < transform.length; k++) {
                if (creature instanceof transform[k][0]) {
                    newMatrix[i][j] = transform[k][1];
                    break;
                }
            }
        }
    }

    return newMatrix
}