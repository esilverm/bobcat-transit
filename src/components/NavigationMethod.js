import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// CSS constant styles
import SC from '../../styleConstants';

export default class NavigationMethod extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.methodTopBar}>
                    <Text style={styles.minutesLeft}>
                        Leave in {this.props.leaveMinutes} mins
                    </Text>
                </View>
                <View style={styles.methodBottomBar}>
                    <View style={styles.methodBottomLeftBar}>

                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 80,
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
    },
    methodTopBar:{
        width: '100%',
        height: RFPercentage(3),
        flexDirection: 'row',
        alignItems: 'center'
    },
    minutesLeft:{
        color: '#525252',
        fontSize: RFPercentage(2.4),
        paddingHorizontal: RFPercentage(2),
        paddingVertical: RFPercentage(0.5),
        fontFamily: 'fira-sans-condensed-semi-bold'
    }
