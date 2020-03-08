import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// CSS constant styles
import SC from '../../styleConstants';

function distance(coordinate1: Coordinate, coordinate2: Coordinate): number {
    const toRadian = n => (n * Math.PI) / 180
    let lat2 = coordinate2.lat
    let lon2 = coordinate2.lon
    let lat1 = coordinate1.lat
    let lon1 = coordinate1.lon
    let R = 6371 // km
    let x1 = lat2 - lat1
    let dLat = toRadian(x1)
    let x2 = lon2 - lon1
    let dLon = toRadian(x2)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d
}

export default class NearestStops extends Component{
    // console.log(this.props.stops.sort(stop => {
    //     return distance({
    //         lat:stop.latitude,
    //         long:stop.longitude
    //     }, {
    //         lat:this.props.latitude,
    //         long:this.props.longitude
    //     })
    // })[0]);
    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Nearest Stops</Text>
                </View>
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
    }
});