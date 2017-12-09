import { createStore } from 'redux';

import reducers from '../reducers';

export default function configureStore(persistedState) {
    return createStore(
      reducers,
      persistedState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
