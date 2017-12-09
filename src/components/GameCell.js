import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { clickCell } from '../actions/game';
import GameLogic from '../config/GameLogic';
import Ball from './Ball';

const baseCellStyle = {
  height: '60px',
  width: '60px',
  backgroundColor: 'black',
  display: 'inline-block',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'grey',
  boxSizing: 'border-box',
  verticalAlign: 'bottom',
};

const GameCell = ({clickCell, x, y, status, players, currentPlayer, clicksToBlow}) => {
  const cellStyle = {...baseCellStyle};
  if (!!currentPlayer) {
    cellStyle.borderColor = currentPlayer.color;
  }

  return (
    <div onClick={clickCell} style={cellStyle}>
      {status.player !== -1
        ? <Ball
          color={players[status.player].color}
          clicksToBlow={clicksToBlow}
        />
        : null
      }
    </div>
  )
};

GameCell.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  clickCell: PropTypes.func,
  status: PropTypes.object,
  players: PropTypes.array,
  currentPlayer: PropTypes.object,
  clicksToBlow: PropTypes.number,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickCell: () => {
      dispatch(clickCell(ownProps.x, ownProps.y))
    },
  }
};

const mapStateToProps = (state, ownProps) => {
  const { rows, cols, players, grid, currentPlayer } = state.game;
  const logic = new GameLogic(rows, cols, players, grid);
  return {
    status: grid[ownProps.x][ownProps.y],
    players: players,
    currentPlayer: currentPlayer === -1 ? null : players[currentPlayer],
    clicksToBlow: logic.cellWillBlowIn(ownProps.x, ownProps.y),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCell);
