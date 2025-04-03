import Empty from './creatures/empty.js';
import { matrix, matrixSize } from './initialization.js';


export let frameCount = 0; // Zähler für die Anzahl der Frames

export function incrementFrameCount() {
    frameCount++;
}

// like p5 random function
export function random(...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
        return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        return Math.floor(Math.random() * (args[1] - args[0] + 1) - args[0]);
    } else {
        console.log(args);
        throw new Error('Invalid arguments');
    }
}

// like p5 int function
export function int(value) {
    if (Array.isArray(value)) {
        return value.map(int);
    } else {
        return Math.floor(value);
    }
}


// Aktualisiert die Position einer Kreatur in der Matrix
// Erstellt ein neues leeres Objekt an der alten Position
export function updateCreaturePosition(creature, newPos) {
    if (matrix[creature.row][creature.col] !== creature) {
        let creatureType = creature.constructor.name;
        let message = `Ein ${creatureType}-Kreatur soll bewegt werden, aber befindet sich nicht mehr in der Matrix.\
Das liegt wahrscheinlich daran, dass sie zuvor "gestorben" ist und die Position bereits\
von einer anderen Kreatur eingenommen wurde. Nachdem eine Kreatur "stirbt", sollte sie\
sich nicht mehr bewegen. Wahrscheinlich hast du die Logik fürs sterben vor der logik fürs\
fressen/bewegen in der step() Methode. Versuche, die Logik fürs sterben ganz ans Ende der\
step() Methode zu verschieben oder verwende ein return, um die Methode nach dem Sterben zu beenden.`;
        throw new Error(message);
    }
    let newRow = newPos[0];
    let newCol = newPos[1];
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

// Für eine gegebene Position werden alle Nachbarpositionen gesucht,
// die einen bestimmten Kreaturentyp enthalten und innerhalb einer bestimmten Distanz liegen
// Gibt eine Liste von [row, col]-Positionen zurück
// Beispiel: findNeighbourPositions(10, 10, 1, Empty) gibt alle leeren Zellen
// um die Position 10, 10 im Abstand von 1 zurück.
// Wenn alle Zellen leer sind, wird [[9, 9], [9, 10], [9, 11], [10, 9], [10, 11], [11, 9], [11, 10], [11, 11]] zurückgegeben
export function findNeighbourPositions(row, col, distance, creatureType) {
    let positions = [];
    for (let nCol = col - distance; nCol <= col + distance; nCol++) {
        for (let nRow = row - distance; nRow <= row + distance; nRow++) {
            let isInMatrix = nCol >= 0 && nCol < matrixSize && nRow >= 0 && nRow < matrixSize;
            let isSamePosition = nCol === col && nRow === row;
            if (isInMatrix && !isSamePosition && matrix[nRow][nCol] instanceof creatureType) {
                positions.push([nRow, nCol]);
            }
        }
    }
    return positions;
}

// Diese Funktion sorgt dafür, dass die Matrix nur noch Strings mit Farben enthält
export function getTransformedMatrix() {
    return matrix.map(row => row.map(cell => cell.color || 'white'));
}


// Funktion für andere Version, wo die Matrix Zahlen enthält
// export function getTransformedMatrix() {
//     let colorMap = {
//         0: 'white',
//         1: 'green',
//         2: 'yellow',
//         3: 'red'
//     }
//     return matrix.map(row => row.map(cell => colorMap[cell]));
// }

