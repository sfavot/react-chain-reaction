import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import keys from 'lodash/keys';

import configureStore from './config/store';
import { initGame } from './actions/game';

const persistedState =
  localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}
;
const store = configureStore(persistedState);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

if (!keys(persistedState).length) {
  store.dispatch(initGame());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
