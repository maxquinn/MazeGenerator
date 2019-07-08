import Path from '../classes/Path';
import findNeighbors from './findNeighbors';
import shuffle from './shuffle';

function forgeTheLabyrinth(x, y, stateGrid, stateFrontier = []) {
  const grid = stateGrid;
  const frontier = stateFrontier;
  const currentCell = grid[x][y];
  grid[x][y] = new Path(currentCell.x, currentCell.y, currentCell.size);
  frontier.unshift(grid[x][y]);
  currentCell.setNeighbors(findNeighbors(currentCell, grid));
  currentCell.neighbors = shuffle(currentCell.neighbors);

  while (currentCell.hasNeighbors()) {
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
        frontier.unshift(grid[nextNeighbor.x][nextNeighbor.y]);
        forgeTheLabyrinth(neighbor.x, neighbor.y, grid, frontier);
      }
    });

    currentCell.neighbors.pop();
  }
  return {
    grid,
    frontier,
  };
}

export default forgeTheLabyrinth;
