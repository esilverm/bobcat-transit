import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import fetch from 'cross-fetch';
import getDistance from 'geolib/es/getDistance';
// Route Data
import A from '../routes/A.json';
import B from '../routes/B.json';
import C from '../routes/C.json';
import E from '../routes/E.json';
import F from '../routes/F.json';
import G from '../routes/G.json';
import W from '../routes/W.json';

const routes = {
    A,
    B,
    C,
    E,
    F,
    G,
    W
}


// CSS constant styles
import SC from '../../styleConstants';
import NavigationMethod from './NavigationMethod.js'

// Wrap in Redux to get courses.
export default class NavigateToCourse extends Component{
    state = {
        loading: false,
        liveRoutes: [],
        routes: [],
        originLatLong: {},
        destinationLatLong: {},
    }

    routeNames = {
        'Route A': 'A',
        'Route B': 'B',
        'Route C': 'C',
        'Route E': 'E',
        'Route F': 'F',
        'Route G': 'G',
        'Route W': 'W',
    }
    
    
    constructor(props) {
        super(props);

        // props.fetchData = props.fetchData.bind(this)
        
    }
    
    async _fetchCurrentRoutes() {
        this.setState({ loading: true });
        const data = JSON.stringify({"s0":"1007","sA":1,"rA":0});
        const response = await fetch('https://passio3.com/www/mapGetData.php?getBuses=1&deviceId=0', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err));

        this.setState({ liveRoutes: response.buses, loading: false});
    }

    async _geocodeLocation(address, key) {
        this.setState({ loading: true });
        const response = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=sJTEhxOyxLFpEhBUM9wDiyAZsfviXXk8&location=${address}`)
            .then(res => res.json())
            .then(data => res.data.results[0].locations[0].latLng)
            .catch(err => console.log(err))

        this.setState({ loading: false, [key]: response })
    }

    async _getPassioRoute(origin, destination, arrivalTime) {
        
        const timeSpent = NUMBER.MAX_VALUE;
        let bestStart;
        let bestEnd;
        for(r in this.state.liveRoutes){
            let routeStops = this.props.stops.filter(stop => stop.routeLong === r.route);
            for(s in routeStops) {
                let closestStop;
                let minDistance = NUMBER.MAX_VALUE;
                if (this.distance(s, origin) < minDistance){
                    closestStop = s;
                    minDistance = this.distance(s, origin);
                    continue;
                }
                let closestStop2;
                let minDistance2 = NUMBER.MAX_VALUE;
                if (this.distance(s, destination) < minDistance) {
                    if (closestStop2.stopNumber < closestStop.stopNumber) {
                        continue;
                    }
                    closestStop2 = s;
                    minDistance = this.distance(s, destination);
                }
            }
            let data = routes[this.routeNames[r.route]];
            let name1 = closestStop2.name;
            let name2 = closestStop.name;
        
            let end = data["Sun"].name1.split(":");
            let start = data["Sun"].name2.split(":");
            let tempTime = Math.round(getDistance([origin.latitude,origin.longitude], [closestStop.latitude,closestStop.longitude]))/84 + Math.round(getDistance([destination.latitude,destination.longitude], [closestStop2.latitude,closestStop2.longitude]))/84 + (end[0]*60+end[1] - start[0]*60+start[1]);
            if (tempTime < timeSpent) {
                timeSpent = tempTime
                bestStart = closestStop;
                bestEnd = closestStop2;
            }
        }
        // no shuttle path found
        if(bestStart = null){
            return null;
        }
        // best shuttle path time
        return [bestStart.route, bestStart, bestEnd, timeSpent];
    }

    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>User Experience Design</Text>
                    <Text style={styles.subTitle}>Starts in 55 minutes</Text>
                </View>
                <NavigationMethod 
                    leaveMinutes={36}
                    emissions={1.8}
                    cost={2.75}
                    route={{
                        'start':{'address':'400 Broome St'},
                        'end': {'address':'70 Washington Square S'},
                        'walk':{'time':4}
                    }}
                    stops={this.props.stops}
                    />
                <NavigationMethod 
                    leaveMinutes={13}
                    emissions={2.1}
                    cost={0}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        width: '90%',
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
        color: '#C3C3C3',
        color: '#EAEAEA'
    }, 
    subTitle:{ 
        fontFamily: 'fira-sans-condensed-medium-italic',
        fontSize: RFPercentage(2),
        color: '#C3C3C3'
    }
});