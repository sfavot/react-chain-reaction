import * as React from 'react';
import { connect } from 'react-redux';

import './App.css';
import GameGrid from './components/GameGrid';
import GameSettings from './components/GameSettings';
import Ball from './components/Ball';
import HistoryButtons from './components/HistoryButtons';
import { resetGame } from './actions/game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showSettings: false};
  };

  toggleSettings = () => {
    const value = !this.state.showSettings;
    this.setState({showSettings: value}, () => {
      if (value) {
        this.settings.scrollIntoView();
      }
    })
  };

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="logo">
            <Ball color="#FF0000" clicksToBlow={3} className="large-ball" />
          </div>
          <div className="logo">
            <Ball color="#1EF127" clicksToBlow={3} className="large-ball" />
          </div>
          <div className="logo">
            <Ball color="#0099ff" clicksToBlow={3} className="large-ball" />
          </div>
          <h1 className="title">Welcome to React Chain Reaction</h1>
        </header>
        <div ref={x => this.settings = x} className="app-settings">
          <div className="settings-wrapper">
            <h2 className="no-margin">Settings</h2>
            <GameSettings show={this.state.showSettings} />
          </div>
          <div onClick={this.toggleSettings} className="settings-toggle" />
        </div>
        <p className="intro">
          {this.props.gameEnded
            ? <span className="victory">{`Player ${this.props.currentPlayer + 1} won!`}</span>
            : <span>{`Player ${this.props.currentPlayer + 1} turn.`}</span>
          }
        </p>
        <HistoryButtons />
        <GameGrid />
        <div className="footer">
          <button onClick={this.props.reset}>
            Reset game
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
      dispatch(resetGame());
    },
  };
}

const mapStateToProps = (state) => {
  return {
    currentPlayer: state.game.present.currentPlayer,
    gameEnded: state.game.present.gameEnded,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
