import * as React from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import GameGrid from './components/GameGrid';
import GameSettings from './components/GameSettings';
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Chain Reaction</h1>
        </header>
        <div ref={x => this.settings = x} className="App-settings">
          <div className="settings-wrapper">
            <h2 className="no-margin">Settings</h2>
            <GameSettings show={this.state.showSettings} />
          </div>
          <div onClick={this.toggleSettings} className="settings-toggle" />
        </div>
        <p className="App-intro">
          {this.props.gameEnded
            ? <span className="victory">{`Player ${this.props.currentPlayer + 1} won!`}</span>
            : <span>{`Player ${this.props.currentPlayer + 1} turn.`}</span>
          }
        </p>
        <GameGrid />
        <div className="App-footer">
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
    currentPlayer: state.game.currentPlayer,
    gameEnded: state.game.gameEnded,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
