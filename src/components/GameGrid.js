import * as React from 'react';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GameCell from './GameCell';

const gridStyle = {
  margin: 'auto',
  borderWidth: '3px',
  borderStyle: 'solid',
  borderColor: 'grey',
  display: 'inline-block',
};

const lineStyle = {
  height: 'auto',
};

const GameGrid = (props) => {
  const style = {...gridStyle};
  if (!!props.currentPlayer) {
    style.borderColor = props.currentPlayer.color;
  }

  return (
    <div style={style}>
      {range(props.rows).map(row => {
        return (
          <div key={`row-${row}`} style={lineStyle}>
            {range(props.cols).map(col => {
              return (
                <GameCell
                  key={`cell-${row}-${col}`}
                  x={row}
                  y={col}
                />
              );
            })}
          </div>
        );
      })}

    </div>
  );
}

GameGrid.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    cols: state.game.cols,
    rows: state.game.rows,
    currentPlayer: state.game.currentPlayer === -1 ? null : state.game.players[state.game.currentPlayer],
  };
}

export default connect(mapStateToProps)(GameGrid);
