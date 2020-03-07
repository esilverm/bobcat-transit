import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// CSS constant styles
import SC from '../../styleConstants';
// Components
import DestinationIcon from './destinationIcon'
import LeftDestinationIcon from './leftDestinationIcon'

export default class NavigationBar extends Component{
    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.SearchContainer}>
                    <View style={styles.IconContainer}>
                        <MaterialIcons
                            name='search'
                            color={'#d6d7da'}
                            size={Math.round(Dimensions.get('window').height)/18}
                        />
                    </View>
                </View>
                <View style={styles.DestinationContainer}>
                    <LeftDestinationIcon icon='bed-empty' title='DORM' left='true'/>
                    <DestinationIcon icon='office-building' title='TISCH'/>
                    <DestinationIcon icon='office-building' title='370J'/>
                    <DestinationIcon icon='pine-tree' title='WSQ'/>
                    <DestinationIcon icon='dots-horizontal' title='EDIT'/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        width: '80%',
        height: 120,
        backgroundColor: 'white',
        marginTop: -60,
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
    SearchContainer:{
        width: '100%',
        height: '50%',
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
    },
    IconContainer:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    DestinationContainer:{
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
  });

