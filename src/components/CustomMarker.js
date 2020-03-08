import React, {Component} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {Marker, Callout} from 'react-native-maps';

export default class CustomMarker extends React.Component
{
    constructor(){
        super();
        this.state = {
            loading: false,
            buses: [],
            tracksViewChanges: true,
        }

        this._getEta = this._getEta.bind(this)
    }

    stopRendering = () => { this.setState({ tracksViewChanges: false }) }

    _getEta = (stopId) => {
        this.setState({ loading: true });
        fetch(`https://passio3.com/www/mapGetData.php?eta=3&stopIds=${stopId}&userId=1007`) 
            .then(res => res.json())
            .then(json => {
                if (json.ETAs.length === 0) {
                    this.setState({ loading: false })
                    return;
                }
                const busList = json.ETAs[stopId].map(buses => ({
                    name: buses.theStop.shortName,
                    eta: buses.eta,
                }))
                console.log(busList)
                this.setState({ buses: busList, loading: false })
                redrawCallout();
            })
            .catch(err => console.log(err))
    }   

    render()
    {
        const marker = this.props;
        return (
            <Marker
                key={marker.keyValue}
                coordinate={marker.coordinates}
                title={marker.title}
                tracksViewChanges={this.state.tracksViewChanges}
                onSelect={e => this._getEta(marker.keyValue)}>
                <View style={[{backgroundColor: marker.color}, styles.markerBack]}>
                </View>
                <Image
                    source={marker.image}
                    style={styles.mapMarker}
                    onLoad={this.stopRendering}/>
                
                <Callout style={styles.callout}  tooltip={true}>
                    <View style={[styles.header,{backgroundColor: marker.color}]}>
                        <Text style={styles.title}>{marker.title}</Text>
                    </View>
                    <Text>
                    {
                        // console.log(this.state.buses.length);
                        this.state.buses.length !== 0 &&
                            "lol"
                        // this.state.buses.map((bus, key) => (
                        //     <Text key={key}>bus.eta</Text>
                        // ))
                    }
                    </Text>
                </Callout>
            </Marker>
        )
    }

}


const styles = StyleSheet.create({
    mapMarker:{
        width: 24,
        height: 43
    },
    markerBack:{
        width: 18,
        height: 18,
        position: 'absolute',
        bottom: 22,
        left: 3,
    },
    callout:{
        shadowOpacity: 0,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 7
    },
    header:{
        width: '100%',
        height: 27,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7
    },
    title:{
        flex: 1,
        fontSize: 16,
        padding: 5,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'fira-sans-extra-condensed-bold',
    }
});
