import { createStore } from 'redux';
import { persistStore } from 'redux-persist';

import reducers from '../reducers';

export default function configureStore() {
    const store = createStore(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    const persistor = persistStore(store);

    return { persistor, store };
}
