// The landing screen is the first page of the 
// onboarding sequence of the app

import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// CSS constant styles
import SC from '../../styleConstants'
// SVG Imports
// import LandingHero from '../../assets/LandingPageHero.svg'

export default function LandingScreen() {
    return (
      <View style={styles.container}>
        {/* <LandingHero/> */}
        <Text>Home Screen</Text>
      </View>
    );
}
  
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: SC.PRIMARY
  }
});