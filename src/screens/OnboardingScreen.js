import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, TextInput} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Avatar from "../../assets/img/BobcatLogo.svg";
// CSS constant styles
import SC from '../../styleConstants'
import { getStoredState } from 'redux-persist';

export default class OnboardingScreen extends React.Component {
    state = {
      name: '',
      lockName: true,
      course: '',
      courseFadeValue: new Animated.Value(0),
    }
    constructor(props) {
      super(props);
      this._courseFade = this._courseFade.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
    }
  
    _courseFade = () => {
      Animated.timing(this.state.courseFadeValue, {
        toValue: 1,
        duration: 1000
      }).start();

      this.setState({lockName: false })
    }

    _onChangeText = (key, value) => {
      this.setState({ [key]: value });
    }
  
    // Content Return
    render() {
      const { navigation } = this.props;
      
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
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Getting to Know You
            </Text>
          </View>
  
          {/* Name Response */}
          <View style={[styles.messageContainer, styles.nameContainer]}> 
            <Avatar style={styles.bobcatAvatar}/>
            <View style={styles.triangle}></View>
            <View style={styles.message}>
              <Text style={styles.messageText}>What should I call you?</Text>
            </View>
          </View>
          <View style={styles.responseContainer}>
            <TextInput
              placeholder="Enter Name"
              placeholderTextColor="#DCDCDC"
              style={styles.responseInput}
              onChangeText={text => this._onChangeText('name', text)}
              value={this.state.name}
              editable={this.state.lockName}
            />
            <TouchableOpacity 
              style={styles.responseButton} 
              onPress={this._courseFade}>
                <MaterialCommunityIcons
                    name={'send'}
                    color={SC.PRIMARY_DARK}
                    size={RFPercentage(5)}
                />
            </TouchableOpacity>
          </View>
  
          {/* Course Response */}
          <Animated.View 
            style={[{opacity: this.state.courseFadeValue}, styles.interactionContainer]}>
            <View style={[styles.messageContainer, styles.nameContainer]}> 
              <Avatar style={styles.bobcatAvatar}/>
              <View style={styles.triangle}></View>
              <View style={styles.message}>
                <Text style={[styles.messageText, styles.courseMessageText]}>What courses are you taking?</Text>
              </View>
            </View>
          <View style={styles.responseContainer}>
            <TextInput
              placeholder="Enter Course Title"
              placeholderTextColor="#DCDCDC"
              style={styles.responseInput}
              onChangeText={text => this.onChangeText('course', text)}
              value={this.state.course}
            />
          </View>
          </Animated.View>
        </View>
      );
    }
    
}
  
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start',
    backgroundColor: SC.PRIMARY,
    paddingTop: 50,
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
  },
  title:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginLeft: '15%',
    height: RFPercentage(6),
    marginBottom: RFPercentage(4)
  },
  titleText:{
    color: '#331E3A',
    fontSize: RFPercentage(2.8),
    fontFamily: 'fira-sans-bold',
    paddingLeft: RFPercentage(2.5)
  },
  messageContainer:{
    height: RFPercentage(9),
    width: '100%',
    flexDirection: 'row'
  },
  message:{
    backgroundColor: '#DCDCDC',
    borderRadius: 14,
    padding: RFPercentage(2),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bobcatAvatar:{
    width: '18%',
    aspectRatio: 1/1,
    alignSelf: 'center',
    marginLeft: RFPercentage(2)
  },
  messageText:{
    textAlign: 'center',
    fontFamily: 'fira-sans-bold',
    color: '#202020',
    fontSize: RFPercentage(2.6)
  },
  courseMessageText:{
    fontSize: RFPercentage(2.2)
  },
  triangle:{
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: RFPercentage(2),
    borderRightWidth: RFPercentage(2),
    borderBottomWidth: RFPercentage(2),
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: '#DCDCDC',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    alignSelf: 'center',
    marginLeft: RFPercentage(1)
  },
  responseContainer:{
    height: RFPercentage(6.5),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: RFPercentage(3),
    marginBottom: 50,
    marginTop: 20
  },
  responseInput:{
    height: '100%', 
    backgroundColor: SC.PRIMARY_DARK,
    color: '#DCDCDC',
    borderWidth: 1,
    margin: RFPercentage(2),
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    width: '60%',
    fontFamily: 'fira-sans',
    borderWidth: 0,
    fontSize: RFPercentage(2.2)
  },
  responseButton:{
    height: '100%', 
    aspectRatio: 5/6,
    alignItems: 'center',
    justifyContent: 'center'
  }
});