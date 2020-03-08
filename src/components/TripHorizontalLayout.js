import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DashLine from '../../assets/img/dash.svg'
import SC from '../../styleConstants';

const routeData = {
    'start':{
        'address': '400 Broome Street',
        'nickname': 'Dorm',
        'icon': 'bed-empty',
        'startTime': '10:35'
    },
    'directions':[
        {
            'type': 'walk',
            'time': 4,
            'icon': 'walk'
        },
        {
            'type': 'stop',
            'time': 3,
            'icon': 'map-marker',
            'lineColor': '#F8B6D2',
            'stopName':'Canal St'
        },
        {
            'type': 'shuttle',
            'time': 16,
            'icon': 'bus',
            'lineColor': '#F8B6D2',
            'lineShortName': 'A'
        },
        {
            'type':'stop',
            'time': 0,
            'icon': 'map-marker',
            'lineColor': '#F8B6D2',
            'stopName':'6 Metrotech'
        },
        {
            'type':'walk',
            'time': 2,
            'icon': 'walk'
        }
    ],
    'stop': {
        'address': '370 Jay Street',
        'nickname': '370 J',
        'icon': 'office-building',
        'stopTime': '11:00'
    }
}

export default class TripHorizontalLayout extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View  style={styles.verticalContainer}>
                    <Text style={styles.terminalSupertitle}>
                        {routeData.start.nickname ?? routeData.start.address}
                    </Text>
                    <MaterialCommunityIcons
                        name={routeData.start.icon ?? ' '}
                        color={'#7A7A7A'}
                        size={RFPercentage(4)}/>
                    <Text style={styles.terminalSubtitle}>
                        {routeData.start.startTime}
                    </Text>
                </View>
                {
                    routeData.directions.map((step, key) => (
                        <React.Fragment key={key}>
                            <DashLine style={styles.dashLine}/>
                            <View  style={styles.verticalContainer} key={key}>
                                {
                                    (step.type == 'shuttle' || step.type == 'subway') &&
                                        (
                                            <View style={[styles.bullet, {backgroundColor: step.lineColor}]}>
                                                <Text style={styles.bulletText}>
                                                    {step.lineShortName}
                                                </Text>
                                            </View>
                                        )
                                }
                                {   
                                    (step.type == 'stop') &&
                                        (
                                            <Text style={styles.stopSuperTitle}>
                                                {step.stopName}
                                            </Text>
                                        )
                                }
                                <MaterialCommunityIcons
                                    name={step.icon}
                                    color={(step.icon == 'map-marker'? step.lineColor : '#7A7A7A')}
                                    size={RFPercentage(4)}
                                    style={styles.stepIcon}/>
                                <Text style={styles.stepSubtitle}>
                                    {(step.time >  0 ? step.time : ' ')}
                                </Text>
                            </View>
                        </React.Fragment>
                    ))
                }
                <DashLine style={styles.dashLine}/>
                <View  style={styles.verticalContainer}>
                    <Text style={styles.terminalSupertitle}>
                        {routeData.stop.nickname ?? routeData.stop.address}
                    </Text>
                    <MaterialCommunityIcons
                        name={'office-building'}
                        color={'#7A7A7A'}
                        size={RFPercentage(4)}/>
                    <Text style={styles.terminalSubtitle}>
                        {routeData.stop.stopTime}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '81%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    verticalContainer:{
        alignItems: 'center'
    },
    terminalSupertitle:{
        fontFamily: 'fira-sans-condensed-semi-bold',
        fontSize: RFPercentage(1.8)
    },
    terminalSubtitle:{
        fontFamily: 'fira-sans-extra-condensed-bold',
        fontSize: RFPercentage(2.4),
        color: '#535353'
    },
    stepSubtitle:{
        fontFamily: 'fira-sans-extra-condensed-bold',
        fontSize: RFPercentage(2),
        color: '#5B5B5B'
    },
    stopSuperTitle:{
        fontFamily: 'fira-sans-extra-condensed-bold',
        fontSize: RFPercentage(1.7),
        color: '#5B5B5B',
        marginHorizontal: -RFPercentage(2)
    },
    dashLine:{
        width: RFPercentage(2),
        height: RFPercentage(0.5),
        alignSelf: 'center'
    },
    bullet:{
        borderRadius: 100,
        width: RFPercentage(2.5),
        height: RFPercentage(2.5)
    },
    bulletText:{
        fontFamily: 'fira-sans-extra-condensed-bold',
        color: '#F5F5F5',
        fontSize: RFPercentage(2),
        textAlign: 'center'
    }
})