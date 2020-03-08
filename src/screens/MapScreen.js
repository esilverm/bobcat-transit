// The landing screen is the first page of the 
// onboarding sequence of the app
import React, {useState} from 'react';
import { StyleSheet, StatusBar, Animated, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
const { height, width } = Dimensions.get( 'window' );
// Mapping
import MapView, { Marker, Polyline, AnimatedRegion } from 'react-native-maps';
// Font Scaling
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// CSS constant styles
import SC from '../../styleConstants'
// Components
import BottomSheet from '../components/bottomSheet'
import CustomMarker from '../components/CustomMarker'
// Data Fetching
import fetch from 'cross-fetch';
import {fetchShuttle} from '../actions/actions'
// app data
import app_data from '../../app.json';

import getDistance from 'geolib/es/getDistance';
// Route Data
// import A from '../routes/A.json';
// import B from '../routes/B.json';
// import C from '../routes/C.json';
// import E from '../routes/E.json';
// import F from '../routes/F.json';
// import G from '../routes/G.json';
// import W from '../routes/W.json';

// const routes = {
//     A,
//     B,
//     C,
//     E,
//     F,
//     G,
//     W
// }


let mapStyle = [
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#eff1f9"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c7c9cf"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ceeece"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#e4e4e4"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#d2d2d2"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#c7e1f3"
        }
      ]
    }
  ]

export default class MapScreen extends React.Component {
    state = {
      loading: false,
      homeAddress: '400 Broome St',
      loadingStops: true,
      stops: [],
      routes: [],
      navroutes: [],
      routePointValues: [],
      currentLongitude: 'unknown', //Initial Longitude
      currentLatitude: 'unknown', //Initial Latitude
      region: {
        latitude: 40.693994,
        longitude: -73.986979,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922*(width/height)
      }
    }
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      // Geolocation
      navigator.geolocation.getCurrentPosition(
        //Will give you the current location
        position => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          this.setState({ currentLongitude: currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          this.setState({ currentLatitude: currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = navigator.geolocation.watchPosition(position => {
        //Will give you the location on location change
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        this.setState({ currentLongitude: currentLongitude });
        //Setting state Longitude to re re-render the Longitude Text
        this.setState({ currentLatitude: currentLatitude });
        //Setting state Latitude to re re-render the Longitude Text
      });
      // Data Query 
      const data = JSON.stringify({"s0":"1007","sA":1,"rA":0});
      fetch('https://passio3.com/www/mapGetData.php?getStops=2&deviceId=0', {
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
        method: "POST",
        body: data,
      }).then(res => res.json())
        .then(data => {
        // Stops
          const stopData = data.stops;
          // Parse stops
          const busStopLocations = Object.keys(stopData).map((key, index) => {
            const stop = stopData[key];
            return {
              id: stop.id,
              name: stop.name,
              latitude: stop.latitude,
              longitude: stop.longitude,
              route: stop.routeShortname,
              routeLong: stop.routeName,
              routeId:  stop.routeId,
              stopNumber: stop.position,
            }
          });
        // Routes
          const routeData = data.routes;
          // Parse stops
          const busRoutes = Object.keys(routeData).map((key, index) => {
            const route = routeData[key];
            return {
              id: key,
              name: route[0],
              color: route[1]
            }
          });

        // RoutePoints
          const routePointsData = data.routePoints;
          // Parse stops
          let routePointsReformatted = [];
          const routePoints = Object.keys(routePointsData).map((key,index) => {
            routePointsReformatted.push([]);            
            const routePointVal = routePointsData[key];
            routePointVal[0].forEach(obj => {
              routePointsReformatted[index].push({
                latitude: +obj.lat,
                longitude: +obj.lng
              })
            });
          })
          this.setState({ loadingStops: false, routes: busRoutes, stops: busStopLocations, routePointValues: routePointsReformatted});
          // this._getGoogleRoute(this.state.homeAddress, '70 Washington Square S');
          // this._resetRoutes(this.state.homeAddress)
          // console.log(busStopLocations)
        })
        .catch(err => console.log(err))
    }


  //   _getPassioRoute(origin, destination) {
  //     const timeSpent = NUMBER.MAX_VALUE;
  //     let bestStart;
  //     let bestEnd;
  //     for(r in this.state.liveRoutes){
  //         let routeStops = this.props.stops.filter(stop => stop.routeLong === r.route);
  //         for(s in routeStops) {
  //             let closestStop;
  //             let minDistance = NUMBER.MAX_VALUE;
  //             if (this.getDistance([latitudes.latitude,latitudes.longitude], [origin.latitude, origin.longitude]) < minDistance){
  //                 closestStop = s;
  //                 minDistance = this.getDistance(s, origin);
  //                 continue;
  //             }
  //             let closestStop2;
  //             let minDistance2 = NUMBER.MAX_VALUE;
  //             if (this.getDistance([s.latitude,s.longitude], [destination.latitude, destination.longitude]) < minDistance) {
  //                 if (closestStop2.stopNumber < closestStop.stopNumber) {
  //                     continue;
  //                 }
  //                 closestStop2 = s;
  //                 minDistance = this.getDistance([s.latitude,s.longitude], [destination.latitude, destination.longitude]);
  //             }
  //         }
  //         let data = routes[this.routeNames[r.route]];
  //         let name1 = closestStop2.name;
  //         let name2 = closestStop.name;
      
  //         let end = data["Sun"].name1.split(":");
  //         let start = data["Sun"].name2.split(":");
  //         let tempTime = Math.round(getDistance([origin.latitude,origin.longitude], [closestStop.latitude,closestStop.longitude]))/84 + Math.round(getDistance([destination.latitude,destination.longitude], [closestStop2.latitude,closestStop2.longitude]))/84 + (end[0]*60+end[1] - start[0]*60+start[1]);
  //         if (tempTime < timeSpent) {
  //             timeSpent = tempTime
  //             bestStart = closestStop;
  //             bestEnd = closestStop2;
  //         }
  //     }
  //     // no shuttle path found
  //     if(bestStart = null){
  //         return null;
  //     }
  //     // best shuttle path time
  //     return {
  //       type: 'shuttle',
  //       time: timeSpent,
  //       icon: 'shuttle',
  //       route: bestStart.route,
  //       departureStop: {
  //           name: bestStart.name,
  //           icon: 'map_marker'
  //       },
  //       arrivalStop: {
  //           name: bestEnd.name,
  //           icon: 'map_marker'
  //       }
  //   }
  //     // return [bestStart.route, bestStart, bestEnd, ];
  // }
    
    onRegionChange(region) {
      this.setState({ region });
    }

    async _getGoogleRoute(origin, destination, mode="transit") {
      this.setState({ loading: true });
      const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${typeof origin === 'object' ? (origin.latitude + ',' + origin.longitude) : origin.replace(' ', '+')}&destination=${typeof destination === 'object' ? (destination.latitude + ',' + destination.longitude) : destination.replace(' ', '+')}&key=${app_data.expo.ios.config.googleMapsApiKey}&mode=${mode}&departure_time=now`)
          .then((res) => res.json())
          .then((json) =>  {
              return {
                  duration: Math.round(json.routes[0].legs[0].duration.value/60),
                  cost: json.routes[0].legs[0].steps.reduce((acc, curr) =>  {
                    return acc + (curr.travel_mode === 'TRANSIT' ? 2.75 : 0)
                  }, 0),
                  polyline: json.routes[0].overview_polyline.points,
                  route: {
                      start: {
                          address: json.routes[0].legs[0].start_address,
                          icon: 'bed-empty',
                          nickname: json.geocoded_waypoints[0].types[0],
                          startTime: json.routes[0].legs[0].departure_time.text
                      }, 
                      stop: {
                          address: json.routes[0].legs[0].end_address,
                          nickname: json.geocoded_waypoints[1].types[0],
                          icon: 'office-building',
                          stopTime: json.routes[0].legs[0].arrival_time.text
                      }
                  },
                  directions: json.routes[0].legs[0].steps.map(step => {
                      switch(step.travel_mode) {
                          case 'WALKING':
                              return  {
                                  type: 'walk',
                                  icon: 'walk',
                                  time: Math.round(step.duration.value/60)
                              }
                          case 'TRANSIT':
                              if (step.transit_details.line.vehicle.type === 'SUBWAY') {
                                  return {
                                      type: 'subway',
                                      time: Math.round(step.duration.value/60),
                                      icon: 'subway',
                                      lineColor: step.transit_details.line.color,
                                      lineShortName: step.transit_details.line.short_name,
                                      departureStop: {
                                          name: step.transit_details.departure_stop.name,
                                          icon: 'map_marker'
                                      },
                                      arrivalStop: {
                                          name: step.transit_details.arrival_stop.name,
                                          icon: 'map_marker'
                                      }
                                  }
                              } else {
                                  return {
                                      type: 'bus',
                                      time: Math.round(step.duration.value/60),
                                      icon: 'bus',
                                      lineColor: step.transit_details.line.color,
                                      lineShortName: step.transit_details.line.short_name,
                                      departureStop: {
                                          name: step.transit_details.departure_stop.name,
                                          icon: 'map_marker'
                                      },
                                      arrivalStop: {
                                          name: step.transit_details.arrival_stop.name,
                                          icon: 'map_marker'
                                      }
                                  }
                              }
                          default:
                              return {}
                      }
                  })
              }
          })
          .catch(err => console.log(err))

      this.setState({ loading: false, navroutes: [response, ...this.state.navroutes] });
  }

  async _resetRoutes(origin, destination) {
      // call our route functions
      this.setState({ routes: [] });
      await this._getGoogleRoute(origin, destination, 'walking')
      await this._getGoogleRoute(origin, destination)

  }
  render() {
    // let ZOOM = 0.08;
    return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <MapView
            style={styles.mapStyle}
            customMapStyle={mapStyle}
            provider="google"
            showsUserLocation={true}
            initialRegion={this.state.region}
            >
            { 
              this.state.routePointValues.map((routePoint, i) => (
              <Polyline
                key={i}
                coordinates={
                  routePoint 
                }
                strokeColor={"" + this.state.routes[i]['color']}
                strokeWidth={2}
              />
              ))
            }
             {
              this.state.stops.map((stop, i) => (
              <CustomMarker
                key={i}
                keyValue={stop.id}
                coordinates={{
                  latitude: stop.latitude,
                  longitude: stop.longitude
                }}
                title={stop.name}
                image={require('../../assets/img/pinMono.png')}
                color={this.state.routes.filter(route => route.id === stop.routeId)[0]['color']}
              />
            ))}
          </MapView>
          <BottomSheet stops={this.state.stops} latitude={this.state.currentLatitude} longitude={this.state.currentLongitude} course={this.props.route.params} fetchData={this._getGoogleRoute}/>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  Container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: SC.PRIMARY
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
