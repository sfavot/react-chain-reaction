import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { clickCell } from '../actions/game';

const cellStyle = {
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

const GameCell = ({clickCell, x, y, status, players, currentPlayer}) => {
  const style = {...cellStyle};
  if (status.player !== -1) {
    style.backgroundColor = players[status.player].color;
  }
  if (!!currentPlayer) {
    style.borderColor = currentPlayer.color;
  }

  return (
    <div onClick={clickCell} style={style}>
      {status.clicked > 0 ? status.clicked : ''}
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
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickCell: () => {
      dispatch(clickCell(ownProps.x, ownProps.y))
    },
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    status: state.game.grid[ownProps.x][ownProps.y],
    players: state.game.players,
    currentPlayer: state.game.currentPlayer === -1 ? null : state.game.players[state.game.currentPlayer],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCell);
