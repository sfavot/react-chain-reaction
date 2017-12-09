import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { clickCell } from '../actions/game';
import GameLogic from '../config/GameLogic';
import Ball from './Ball';

const GameCell = ({
  clickCell, x, y, status, players, currentPlayer, clicksToBlow,
  gameEnded
}) => {
  const cellStyle = {
    borderColor: 'grey',
  };
  if (currentPlayer !== -1) {
    cellStyle.borderColor = players[currentPlayer].color;
  }

  const onCellClick = gameEnded || (status.player !== -1 && status.player !== currentPlayer)
    ? null
    : clickCell
  ;

  return (
    <div className="game-cell" onClick={onCellClick} style={cellStyle}>
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
  currentPlayer: PropTypes.number,
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
  const { rows, cols, players, grid, currentPlayer, gameEnded } = state.game.present;
  const logic = new GameLogic(rows, cols, players, grid);
  return {
    status: grid[ownProps.x][ownProps.y],
    players: players,
    currentPlayer: currentPlayer,
    clicksToBlow: logic.cellWillBlowIn(ownProps.x, ownProps.y),
    gameEnded,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCell);
