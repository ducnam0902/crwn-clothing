import {compose, createStore, applyMiddleware} from 'redux'

//root-reducers
import { rootReducer } from './root-reducer'

import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { rootSaga } from './root-saga'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['cart']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware, logger];

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
