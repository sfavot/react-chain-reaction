import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import game from './game';

const config = {
  key: 'root',
  storage,
};

const reducers = persistCombineReducers(config, { game });

export default reducers;
