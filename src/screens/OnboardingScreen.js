import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Avatar from "../../assets/img/BobcatLogo.svg";
import fetch from 'cross-fetch';
import SC from '../../styleConstants'
import { getStoredState } from 'redux-persist';
import Moment from 'moment';
import { addCourse, setName } from '../actions/actions';

export default class OnboardingScreen extends React.Component {
    state = {
      name: '',
      lockName: true,
      course: '',
      courseFadeValue: new Animated.Value(0),
      courseSuggestions: [],
      year: 2020,
      semester: 'su',
    }
    constructor(props) {
      super(props);
      this._courseFade = this._courseFade.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
    }
  
    _courseFade = () => {
      Animated.timing(this.state.courseFadeValue, {
        toValue: 1,
        duration: 600
      }).start();

      this.setState({lockName: false })
    }

    _onChangeText = (key, value) => {
      if(key == 'course'){
        //===============================
        // SCHEDGE
        //===============================
        fetch(`https://schedge.torchnyu.com/${this.state.year}/${this.state.semester}/search?query=${value}&limit=3`)
          .then((res) => res.json())
          .then((json) => {
            // process here.
            let listing = [];
            json.forEach((course, i) => {
              course.sections.forEach((section, i) => {
                listing.push({
                  name: section.name,
                  time: Moment(section.meetings[0].beginDate).format('ddd h:mm') + Moment(section.meetings[0].beginDate).add(section.meetings[0].duration, 'minutes').format('-h:mm'),
                  location: section.location,
                })
              })
            });
            console.log(listing)
            this.setState({ courseSuggestions: [ {
              name: "User Experience Design",
              time: "Sun 1:00-2:15",
              location: "721 Broadway"
            }, ...listing] });
          })
          .catch(err => console.log(err));
      }
      this.setState({ [key]: value });
    }

    // Content Return
    render() {
      const { navigation, dispatch } = this.props;
      // console.log(dispatch)
      return (
        <ScrollView 
          style={styles.container}
          contentContainerStyle={{
            alignItems: 'flex-start', 
            justifyContent: 'flex-start',
          }}>
        <KeyboardAvoidingView behavior="position">
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
          <View style={[styles.responseContainer, styles.courseResponseContainer]}>
            <TextInput
              placeholder="Enter Course Title"
              placeholderTextColor="#DCDCDC"
              style={[styles.responseInput, styles.courseResponseInput]}
              onChangeText={text => this._onChangeText('course', text)}
              value={this.state.course}
            />
            <View style={styles.courseSuggestions}>
              {
                this.state.courseSuggestions.map((course, i) => {
                  return (
                    <TouchableOpacity onPress={() => navigation.navigate('Map', course)} key={i}>
                      <View style={styles.courseItem}>
                        <Text style={styles.courseTitle}>{course.name}</Text>
                        <Text style={styles.courseSubtitle}>{course.time}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          </Animated.View>
          </KeyboardAvoidingView>
        </ScrollView>
      );
    }
    
}
  
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: SC.PRIMARY,
    paddingTop: 50,
  },
  backButton:{
    backgroundColor: SC.PRIMARY_DARK,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
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
    marginRight: RFPercentage(2),
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
  },
  courseResponseContainer:{
    height: RFPercentage(20),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  },
  courseResponseInput:{
    width: '80%',
    height: RFPercentage(7),
    marginTop: 0
  },
  courseSuggestions:{
    width: '80%',
    marginRight: RFPercentage(2),
  },
  courseItem:{
    padding: RFPercentage(1),
    width: '100%',
    backgroundColor: '#2D1A33',
    justifyContent: 'center'
  },
  courseTitle:{
    fontSize: RFPercentage(2),
    fontFamily: 'fira-sans-extra-condensed-bold',
    color: 'white'
  },
  courseSubtitle:{
    fontSize: RFPercentage(1.75),
    fontFamily: 'fira-sans-condensed-medium-italic',
    color: '#ADADAD'
  }
});