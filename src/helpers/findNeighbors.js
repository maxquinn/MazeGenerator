import Wall from '../classes/Wall';

export function findNeighbors(cell, grid) {
    let neighbors = [];

    if (cell.col - 1 >= 0) {
        let leftNeighbor = grid[cell.row][cell.col - 1];
        if (leftNeighbor instanceof Wall) {
            neighbors.push(leftNeighbor);
        }
    }
    if (cell.col + 1 < grid[0].length) {
        let rightNeighbor = grid[cell.row][cell.col + 1];
        if (rightNeighbor instanceof Wall) {
            neighbors.push(rightNeighbor);
        }
    }
    if (cell.row - 1 >= 0) {
        let topNeighbor = grid[cell.row - 1][cell.col];
        if (topNeighbor instanceof Wall) {
            neighbors.push(topNeighbor);
        }
    }
    if (cell.row + 1 < grid.length) {
        let bottomNeighbor = grid[cell.row + 1][cell.col];
        if (bottomNeighbor instanceof Wall) {
            neighbors.push(bottomNeighbor);
        }
    }

    return neighbors;
}
