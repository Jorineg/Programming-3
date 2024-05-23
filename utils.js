import Empty from './empty.js';

const size = 50;
const blockSize = 15;

let state = {
    matrix: [],
    frameCount: 0,
}

function updateCreaturePosition(creature, newPos) {
    let [newRow, newCol] = newPos;
    state.matrix[newRow][newCol] = creature;
    state.matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

function findNeighbourPositions(row, col, distance, creatureType) {
    let positions = [];
    for (let nCol = col - distance; nCol <= col + distance; nCol++) {
        for (let nRow = row - distance; nRow <= row + distance; nRow++) {
            if (nCol >= 0 && nCol < size && nRow >= 0 && nRow < size && state.matrix[nRow][nCol] instanceof creatureType) {
                positions.push([nRow, nCol]);
            }
        }
    }
    return positions;
}

function random(...args) {
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

export { state, size, blockSize, updateCreaturePosition, findNeighbourPositions, random };
