export const INIT_GAME = 'INIT_GAME';
export const CLICK_CELL = 'CLICK_CELL';

const ROWS = 8;
const COLS = 6;
const PLAYERS = [
  {
    color: 'red',
  },
  {
    color: '#1EF127',
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

export const clickCell = (x, y) => {
  return {
    type: CLICK_CELL,
    payload: {
      x,
      y,
    }
  }
};
