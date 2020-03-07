// The landing screen is the first page of the 
// onboarding sequence of the app
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
// Font Scaling
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// CSS constant styles
import SC from '../../styleConstants'

export default function OnboardingScreen() {
    return (
      <View style={styles.container}>
          <Text>Bottom Sheet</Text>
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