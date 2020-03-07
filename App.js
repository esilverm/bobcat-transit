import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redeux Imports
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// React Navigation Imports
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Onboarding Screens
import LandingScreen from './src/screens/LandingScreen'


const Stack = createStackNavigator();


export default function App() {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={LandingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    //   </PersistGate>
    // </Provider>

  );
}