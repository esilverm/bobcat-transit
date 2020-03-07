// The landing screen is the first page of the 
// onboarding sequence of the app
import React, {useState} from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
// Font Scaling
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// CSS constant styles
import SC from '../../styleConstants'
// Image Imports

export default function LandingScreen() {
    return (
      <View style={styles.container}>
        {/* <Image source={{uri:''}} style={{ width: 305, height: 159 }} />  */}
        <Text style={styles.welcomeText}>
          Welcome to Bobcat Transit!
        </Text>
        <TouchableOpacity style={styles.setupButton}>
          <Text style={styles.setupText}>Let's Start!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip to Map</Text>
        </TouchableOpacity>
      </View>
    );
}
  
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: SC.PRIMARY
  },
  setupButton:{
    marginTop: 30,
    backgroundColor: SC.PRIMARY_DARK,
    borderRadius: 100
  },
  setupText:{
    color: 'white',
    fontSize: RFPercentage(3),
    padding: 20
  },
  welcomeText:{
    textAlign: 'center',
    color: 'white',
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
    paddingHorizontal: 50
  },
  skipButton:{

  },
  skipText:{
    color: '#ADADAD',
    fontStyle: 'italic',
    fontSize: RFPercentage(2),
    padding: RFPercentage(2)
  }
});