import range from 'lodash/range';
import keys from 'lodash/keys';

export default class GameLogic {
  constructor(rows, cols, players, grid) {
    this.rows = rows;
    this.cols = cols;
    this.currentPlayer = -1;
    this.players = this.refreshPlayers(players);
    this.grid = this.refreshGrid(grid);
    this.x = -1;
    this.y = -1;
    this.turn = 0;
    this.cellsActivated = 0;
  };

  playTurn = (x, y, currentPlayer, turn) => {
    this.currentPlayer = currentPlayer;
    this.x = x;
    this.y = y;
    this.turn = turn;

    this.play();

    return {
      grid: this.grid,
      currentPlayer: this.currentPlayer,
      gameEnded: this.hasGameEnded(),
      players: this.players,
      turn: this.turn
    };
  }

  getNextPlayer = () => {
    if (this.hasGameEnded()) {
      return this.currentPlayer;
    }

    let next = null;
    do {
      if (this.currentPlayer < this.players.length - 1) {
        next = this.currentPlayer + 1;
        continue;
      }
      this.turn++;
      next = 0;
    } while (!this.players[next].alive);

    return next;
  };

  play = () => {
    const cell = this.grid[this.x][this.y];

    // If cell does not belongs to current player we don't do shit
    if (cell.player > -1 && cell.player !== this.currentPlayer) {
      return;
    }

    this.turnPlayed = true;
    this.activateCell(this.x, this.y);

    // we check who's dead
    if (this.turn > 0) {
      const alivePlayers = this.getAlivePlayers();

      this.players.forEach((player, index) => {
        if (alivePlayers.indexOf(index) < 0) {
          player.alive = false;
        };
      });
    }

    // something actually happened so we change the player
    this.currentPlayer = this.getNextPlayer();
  }

  activateCell = (x, y) => {
    if (this.cellsActivated > 1000) {
      if (!this.hasGameEnded()) {
        throw Error('Too many cells blew, the game can\'t take it.');
      }
      return;
    }

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
    this.cellsActivated++;

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

  hasGameEnded = () => {
    return this.turn > 0 && this.getAlivePlayers().length === 1;
  }

  getAlivePlayers = () => {
    const alive = [];

    range(this.rows).forEach(row => {
      range(this.cols).forEach(col => {
        const player = this.grid[row][col].player;
        if (player > -1 && alive.indexOf(player) < 0) {
          alive.push(player);
        }
      });
    });

    return alive;
  }

  refreshGrid = (oldGrid) => {
    const grid = {};
    keys(oldGrid).forEach(row => {
      keys(oldGrid[row]).forEach(col => {
        const cell = oldGrid[row][col];
        if (!grid[row]) {
          grid[row] = {};
        }
        grid[row][col] = { ...cell };
      });
    });

    return grid;
  };

  refreshPlayers = (oldPlayers) => {
    const players = [];
    oldPlayers.forEach(player => {
      players.push({ ...player });
    });

    return players;
  }
}
