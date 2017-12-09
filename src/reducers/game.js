import range from 'lodash/range';

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

export default function (state = INITIAL_STATE, action) {
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
      const players = state.players;
      players.forEach(player => {
        player.alive = true;
      });

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
}

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
