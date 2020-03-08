import React, {useState}  from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
// Redux Imports
import { PersistGate } from 'redux-persist/es/integration/react';
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
// Configure Store
import { store, persistor } from './src/store/store'

const getFonts = () => Font.loadAsync({
  'fira-sans-extra-condensed-black':require('./assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Black.ttf'),
  'fira-sans-extra-condensed-bold':require('./assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Bold.ttf'),
  'fira-sans-extra-condensed-semi-bold':require('./assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-SemiBold.ttf'),
  'fira-sans-condensed-medium-italic': require('./assets/fonts/Fira_Sans_Condensed/FiraSansCondensed-MediumItalic.ttf'),
  'fira-sans-condensed-semi-bold': require('./assets/fonts/Fira_Sans_Condensed/FiraSansCondensed-SemiBold.ttf'),
  'fira-sans': require('./assets/fonts/Fira_Sans/FiraSans-Medium.ttf'),
  'fira-sans-italic': require('./assets/fonts/Fira_Sans/FiraSans-MediumItalic.ttf'),
  'fira-sans-black': require('./assets/fonts/Fira_Sans/FiraSans-Black.ttf'),
  'fira-sans-bold': require('./assets/fonts/Fira_Sans/FiraSans-Bold.ttf'),
});



const Stack = createStackNavigator();


export default function App(){
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // console.log(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      {
        fontsLoaded ? (
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
        ) : (
          <AppLoading
            startAsync={getFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={console.error}
          />
        )
        
      }
        </PersistGate>
      </Provider>
    </>
  );
}