export default class GameLogic {
  constructor(rows, cols, players, grid) {
    this.rows = rows;
    this.cols = cols;
    this.players = players;
    this.grid = grid;
    this.currentPlayer = -1;
    this.x = -1;
    this.y = -1;
  };

  playTurn = (x, y, currentPlayer) => {
    this.currentPlayer = currentPlayer;
    this.x = x;
    this.y = y;

    this.play();

    return {
      grid: this.grid,
      currentPlayer: this.currentPlayer,
    };
  }

  getNextPlayer = () => {
    return this.currentPlayer >= this.players - 1 ? 0 : this.currentPlayer + 1;
  };

  play = () => {
    const cell = this.grid[this.x][this.y];

    // If cell does not belongs to current player we don't do shit
    if (cell.player > -1 && cell.player !== this.currentPlayer) {
      return;
    }

    this.activateCell(this.x, this.y);

    // something actually happened so we change the player
    this.currentPlayer = this.getNextPlayer();
  }

  activateCell = (x, y) => {
    // If cell is not gonna blow we just increase clicks number
    if (this.cellWillBlowIn(x, y) > 1) {
      this.increaseCellClicks(x, y);
      return;
    }

    // Else we blow it
    this.blowCell(x, y);
  };

  increaseCellClicks = (x, y) => {
    const cell = this.grid[x][y];
    this.grid[x][y] = {
      player: this.currentPlayer,
      clicked: cell.clicked + 1,
    }
  };

  blowCell = (x, y) => {
    // blow current cell
    this.grid[x][y] = {
      player: -1,
      clicked: 0,
    };

    // do it again for next cells
    this.getAdjacentCellsCoordinates(x, y).forEach(cellCoordinates => {
      this.activateCell(cellCoordinates.x, cellCoordinates.y);
    });
  }

  cellWillBlowIn = (x, y) => {
    const cell = this.grid[x][y];

    if (this.isCorner(x, y)) {
      return 2 - cell.clicked;
    }

    if (this.isSide(x, y)) {
      return 3 - cell.clicked;
    }

    return 4 - cell.clicked;
  }

  isCorner = (x, y) => {
    if (x !== 0 && x !== this.rows - 1) {
      return false;
    }

    if (y !== 0 && y !== this.cols - 1) {
      return false;
    }

    return true;
  };

  isSide = (x, y) => {
    if (x !== 0 && x !== this.rows - 1 && y !== 0 && y !== this.cols - 1) {
      return false;
    }

    return true;
  };

  getAdjacentCellsCoordinates = (x, y) => {
    const cells = [];

    if (x > 0) {
      cells.push({
        x: x-1,
        y,
      });
    }

    if (x < this.rows - 1) {
      cells.push({
        x: x+1,
        y,
      });
    }

    if (y > 0) {
      cells.push({
        x,
        y: y-1,
      });
    }

    if (y < this.cols - 1) {
      cells.push({
        x,
        y: y+1,
      });
    }

    return cells;
  }
}
