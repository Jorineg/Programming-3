// update the position of a creature in the matrix
// Creates a new empty object in the old position
exports.updateCreaturePosition = function (creature, newPos) {
    let [newRow, newCol] = newPos;
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}


// for a given position, find all neighbour positions contain a certain
// creature type and are within a certain distance
// returns a list of [row, col] positions
// example: findNeighbourPositions(10, 10, 1, Empty) will return all empty cells
// around position 10, 10 within a distance of 1. If all cells are empty, it will return
// [[9, 9], [9, 10], [9, 11], [10, 9], [10, 11], [11, 9], [11, 10], [11, 11]]
exports.findNeighbourPositions = function (row, col, distance, creatureType) {
    let positions = [];
    for (let nCol = col - distance; nCol <= col + distance; nCol++) {
        for (let nRow = row - distance; nRow <= row + distance; nRow++) {
            if (nCol >= 0 && nCol < size && nRow >= 0 && nRow < size && matrix[nRow][nCol] instanceof creatureType) {
                positions.push([nRow, nCol]);
            }
        }
    }
    return positions;
}

exports.random = function (...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && args[0] instanceof Array) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && args[0] instanceof Number) {
        return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && args[0] instanceof Number && args[1] instanceof Number) {
        return Math.floor(Math.random() * (args[1] - args[0] + 1) - args[0]);
    } else {
        throw new Error('Invalid arguments');
    }
}