import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import TripHorizontalLayout from './TripHorizontalLayout'
import SC from '../../styleConstants';

export default class NavigationMethod extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.methodTopBar}>
                    <Text style={styles.topBarText}>
                        Leave in <Text style={styles.bold}>{this.props.leaveMinutes} mins</Text> · 
                        &nbsp;<Text style={styles.bold}>${this.props.cost}</Text>
                    </Text>
                </View>
                <View style={styles.methodBottomBar}>
                    <TripHorizontalLayout
                        // tripData={}
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 110,
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: '#F5F5F5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10 
    },
    methodIcon:{
        position: 'absolute',
        top: RFPercentage(0.5),
        left: RFPercentage(0.5)
    },
    methodTopBar:{
        width: '100%',
        height: RFPercentage(4),
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBarText:{
        color: '#525252',
        fontSize: RFPercentage(2.3),
        paddingHorizontal: RFPercentage(2),
        paddingVertical: RFPercentage(0.5),
        fontFamily: 'fira-sans-extra-condensed-semi-bold',
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#E3E3E3'
    },
    bold:{
        fontFamily:'fira-sans-extra-condensed-black'
    },
    methodBottomBar:{

    }
})