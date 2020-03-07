import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'; 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Reducers to save
  whitelist: [

  ],
  // Reducers to not save
  blacklist: [

  ]
}