import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// CSS constant styles
import SC from '../../styleConstants'

export default function OnboardingScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Landing')}>
          <MaterialCommunityIcons
              name={'chevron-left'}
              color={SC.PRIMARY}
              size={RFPercentage(6)}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Bottom Sheet</Text>
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
  backButton:{
    backgroundColor: SC.PRIMARY_DARK,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
    width: RFPercentage(6),
    height: RFPercentage(6),
  }
});