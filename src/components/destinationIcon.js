import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// CSS constant styles
import SC from '../../styleConstants';

export default class DestinationIcon extends Component{
    render(){
        return(
            <View style={styles.Container}>
                <MaterialCommunityIcons
                    name={this.props.icon}
                    color={'#7A7A7A'}
                    size={Math.round(Dimensions.get('window').height)/25}
                />
                <Text style={styles.IconTitle}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0.5,
        borderColor: '#d6d7da',
    },
    IconTitle:{
        fontSize: RFPercentage(1.8),
        fontWeight: 'bold',
        color: '#7A7A7A',
        fontFamily: 'fira-sans-condensed-semi-bold'
    }
});