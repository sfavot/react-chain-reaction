import range from 'lodash/range';
import undoable from 'redux-undo';

import { INIT_GAME, RESET_GAME, CLICK_CELL } from '../actions/game';
import GameLogic from '../config/GameLogic';

const INITIAL_STATE = {
  grid: {},
  currentPlayer: 0,
  players: [],
  rows: 0,
  cols: 0,
  turn: 0,
  gameEnded: false,
};

const createEmptyGrid = (rows, cols) => {
  const grid = {};
  range(rows).forEach(rowIdx => {
    const row = {};
    range(cols).forEach(colIdx => {
      row[colIdx] = {
        player: -1,
        clicked: 0,
      };
    });
    grid[rowIdx] = row;
  });

  return grid;
};

const ressucitatePlayers = (players) => {
  const newPlayers = [];
  players.forEach(player => {
    newPlayers.push({
      color: player.color,
      alive: true,
    });
  });

  return newPlayers;
}

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_GAME: {
      const { rows, cols, players } = action.payload;
      const grid = createEmptyGrid(rows, cols);

      return {
        grid,
        rows,
        cols,
        players,
        currentPlayer: 0,
        turn: 0,
        gameEnded: false,
      };
    }
    case RESET_GAME: {
      const grid = createEmptyGrid(state.rows, state.cols);
      const players = ressucitatePlayers(state.players);

      return {
        ...state,
        grid,
        currentPlayer: 0,
        players: players,
        turn: 0,
        gameEnded: false,
      };
    }
    case CLICK_CELL: {
      const { x, y } = action.payload;
      const { currentPlayer, rows, cols, players, grid, turn } = state;

      if (!state.gameEnded) {
        const logic = new GameLogic(rows, cols, players, grid);
        const newState = logic.playTurn(x, y, currentPlayer, turn);

        return {
          ...state,
          ...newState,
        };
      }

      return state;

    }
    default:
      return state;
  }
};

export default undoable(game, {
  limit: 1,
  initTypes: ['@@redux-undo/INIT', INIT_GAME, RESET_GAME],
});
