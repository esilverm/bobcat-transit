import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// CSS constant styles
import SC from '../../styleConstants';
import NavigationMethod from './NavigationMethod.js'

export default class NavigateToCourse extends Component{
    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>User Experience Design</Text>
                    <Text style={styles.subTitle}>Starts in 55 minutes</Text>
                </View>
                <NavigationMethod 
                    type={'subway'} 
                    leaveMinutes={36}
                    emissions={1.8}
                    cost={2.75}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    titleContainer:{
        width: '100%',
        backgroundColor: '#6F407E',
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        padding: 10
    },
    title:{
        fontFamily: 'fira-sans-bold',
        fontSize: RFPercentage(2.6),
        color: '#EAEAEA'
    }, 
    subTitle:{ 
        fontFamily: 'fira-sans-condensed-medium-italic',
        fontSize: RFPercentage(2),
        color: '#C3C3C3'
    }
});