import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
// Font Scaling
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// CSS constant styles
import SC from '../../styleConstants'
// Gesture Handler
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// Components
import NavigationBar from './navigationBar'
import NavigateToCourse from './NavigateToCourse'


const DRAWER_MIN_BOTTOM = -0.7 * Math.round(Dimensions.get('window').height);

export default class BottomSheet extends Component{

  constructor(props) {
    super(props);

    this._drawerBottom = new Animated.Value(DRAWER_MIN_BOTTOM);
    this._handleGesture = this._handleGesture.bind(this);
    this._drawerOpen = false;
  }

  _handleGesture({ nativeEvent }) {
    if((DRAWER_MIN_BOTTOM + (Math.round(Dimensions.get('window').height)-  nativeEvent.absoluteY)) < -120){
      this._drawerBottom.setValue((DRAWER_MIN_BOTTOM + (Math.round(Dimensions.get('window').height)-  nativeEvent.absoluteY)));
    }  else  {
      this._drawerBottom.setValue(-120);
    }
  }

  render() {
    return(
      <PanGestureHandler onGestureEvent={this._handleGesture} onHandlerStateChange={this._handleGesture}>
        <Animated.View 
          style={[styles.container, {bottom: this._drawerBottom}]}>
              <NavigationBar/>
              <NavigateToCourse/>
        </Animated.View>
      </PanGestureHandler>
    )
  };
}
  
const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: SC.PRIMARY,
    justifyContent: 'flex-start'
  },
  scrollContainer:{
    flex: 1
  }
});