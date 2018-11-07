import Wall from '../classes/Wall';

export function findNeighbors(cell, grid) {
    let neighbors = [];

    if (cell.y - 1 >= 0) {
        let leftNeighbor = grid[cell.x][cell.y - 1];
        if (leftNeighbor instanceof Wall) {
            neighbors.push(leftNeighbor);
        }
    }
    if (cell.y + 1 < grid[0].length) {
        let rightNeighbor = grid[cell.x][cell.y + 1];
        if (rightNeighbor instanceof Wall) {
            neighbors.push(rightNeighbor);
        }
    }
    if (cell.x - 1 >= 0) {
        let topNeighbor = grid[cell.x - 1][cell.y];
        if (topNeighbor instanceof Wall) {
            neighbors.push(topNeighbor);
        }
    }
    if (cell.x + 1 < grid.length) {
        let bottomNeighbor = grid[cell.x + 1][cell.y];
        if (bottomNeighbor instanceof Wall) {
            neighbors.push(bottomNeighbor);
        }
    }

    return neighbors;
}
