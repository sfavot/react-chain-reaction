import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const HistoryButtons = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p className="button-toolbar">
    {canUndo && <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>}
    {canRedo && <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>}
  </p>
);

const mapStateToProps = (state) => {
 return {
   canUndo: state.game.past.length > 0,
   canRedo: state.game.future.length > 0
 }
};

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryButtons);
