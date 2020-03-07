import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// CSS constant styles
import SC from '../../styleConstants';

export default class NavigationMethod extends Component{
    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>User Experience Design</Text>
                    <Text style={styles.subTitle}>Starts in 55 minutes</Text>
                </View>
                <View style={styles.methodContainer}>
                    <View style={styles.methodTopBar}>
                        <MaterialCommunityIcons
                            name={''}
                            color={'#7A7A7A'}
                            size={RFPercentage(4)}/>
                    </View>
                    <View style={styles.methodBottomBar}>
                        <View style={styles.methodBottomLeftBar}>

                        </View>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
});