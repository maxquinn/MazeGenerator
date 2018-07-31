import Cell from '../classes/Cell';
import { findNeighbors } from './findNeighbors';
import { shuffle } from './shuffle';

export function forgeTheLabyrinth(row, col, stateGrid) {
    let grid = stateGrid;
    let currentCell = grid[row][col];
    grid[row][col] = new Cell(
        currentCell.row,
        currentCell.col,
        currentCell.size
    );

    currentCell.setNeighbors(findNeighbors(currentCell, grid));

    while (currentCell.hasNeighbors()) {
        currentCell.neighbors = shuffle(currentCell.neighbors);
        let nextNeighbor =
            currentCell.neighbors[currentCell.neighbors.length - 1];
        nextNeighbor.setNeighbors(findNeighbors(nextNeighbor, grid));

        nextNeighbor.neighbors.forEach(neighbor => {
            if (
                neighbor.row == currentCell.row - 2 ||
                neighbor.row == currentCell.row + 2 ||
                neighbor.col == currentCell.col - 2 ||
                neighbor.col == currentCell.col + 2
            ) {
                grid[nextNeighbor.row][nextNeighbor.col] = new Cell(
                    nextNeighbor.row,
                    nextNeighbor.col,
                    nextNeighbor.size
                );
                forgeTheLabyrinth(neighbor.row, neighbor.col, grid);
            }
        });
        currentCell.neighbors.pop();
    }
    return grid;
}
