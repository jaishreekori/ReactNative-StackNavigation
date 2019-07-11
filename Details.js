import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class DetailScreen extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            info: ''
        }
    }
    render() {
        const itemId = this.props.navigation.getParam('info', 'NO-Id')
        return (
            <View>
                <Text style={styles.textView}> Date:   {itemId.androidDate}</Text>
                <Text style={styles.textView}> Time:   {itemId.chosenAndroidTime}</Text>
                <Text style={styles.textView}> Note:   {itemId.text}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textView: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }
})
