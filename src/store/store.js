import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'; 
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';


const loggerMiddleware = createLogger()

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Reducers to save
  whitelist: [
    'onboardingReducer'
  ],
  // Reducers to not save
  blacklist: [
  ]
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
  ),
);

const persistor = persistStore(store);

export default {
  store, 
  persistor
}
