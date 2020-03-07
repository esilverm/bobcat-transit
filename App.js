import React, {useState}  from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
// Redux Imports
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// React Navigation Imports
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
// Onboarding Screens
import LandingScreen from './src/screens/LandingScreen'
import MapScreen from './src/screens/MapScreen'
import OnboardingScreen from './src/screens/OnboardingScreen'

const getFonts = () => Font.loadAsync({
  'fira-sans-condensed-semi-bold': require('./assets/fonts/FiraSansCondensed-SemiBold.ttf'),
  //'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
});



const Stack = createStackNavigator();


export default function App(){
  const [fontsLoaded, setFontsLoaded] = useState(false);

  return (
    <>
      {
        fontsLoaded ? (
          // <Provider store={store}>
          //   <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              {true && (
                <>
                  <Stack.Screen name="Landing" component={LandingScreen}/>
                  <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
                </>
              )}
              <Stack.Screen name="Map" component={MapScreen} options={{ headerLeft: null, gestureEnabled: false }} />
            </Stack.Navigator>
          </NavigationContainer>
          //   </PersistGate>
          // </Provider>
        ) : (
          <AppLoading
            startAsync={getFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={console.error}
          />
        )
      }
    </>
  );
}