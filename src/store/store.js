import {compose, createStore, applyMiddleware} from 'redux'

//root-reducers
import { rootReducer } from './root-reducer'

import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['cart']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const middleWares = [thunk];

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
