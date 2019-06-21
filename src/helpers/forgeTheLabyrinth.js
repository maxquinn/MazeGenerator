import Path from '../classes/Path';
import findNeighbors from './findNeighbors';
import shuffle from './shuffle';

function forgeTheLabyrinth(x, y, stateGrid) {
  const grid = stateGrid;
  const currentCell = grid[x][y];
  grid[x][y] = new Path(currentCell.x, currentCell.y, currentCell.size);

  currentCell.setNeighbors(findNeighbors(currentCell, grid));

  while (currentCell.hasNeighbors()) {
    currentCell.neighbors = shuffle(currentCell.neighbors);
    const nextNeighbor = currentCell.neighbors[currentCell.neighbors.length - 1];
    nextNeighbor.setNeighbors(findNeighbors(nextNeighbor, grid));

    nextNeighbor.neighbors.forEach((neighbor) => {
      if (
        neighbor.x === currentCell.x - 2
        || neighbor.x === currentCell.x + 2
        || neighbor.y === currentCell.y - 2
        || neighbor.y === currentCell.y + 2
      ) {
        grid[nextNeighbor.x][nextNeighbor.y] = new Path(
          nextNeighbor.x,
          nextNeighbor.y,
          nextNeighbor.size,
        );
        forgeTheLabyrinth(neighbor.x, neighbor.y, grid);
      }
    });
    currentCell.neighbors.pop();
  }
  return grid;
}

export default forgeTheLabyrinth;
