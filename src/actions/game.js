export const INIT_GAME = 'INIT_GAME';
export const RESET_GAME = 'RESET_GAME';
export const CLICK_CELL = 'CLICK_CELL';

const ROWS = 4;
const COLS = 4;
const PLAYERS = [
  {
    color: '#FF0000',
    alive: true,
  },
  {
    color: '#1EF127',
    alive: true,
  },
];

export const initGame = (rows = ROWS, cols = COLS, players = PLAYERS) => {
  return {
    type: INIT_GAME,
    payload: {
      rows,
      cols,
      players,
    }
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};

export const clickCell = (x, y) => {
  return {
    type: CLICK_CELL,
    payload: {
      x,
      y,
    }
  }
};
