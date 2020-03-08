// import  AsyncStorage  from 'react-native';
import createSecureStore from "redux-persist-expo-securestore";
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'; 
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';

let storage = createSecureStore();

const persistConfig = {
  key: 'root',
  // timeout: null,
  storage
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =  createStore(
  persistedReducer,
  applyMiddleware(
    createLogger()
  )
);

export const persistor = persistStore(store);
