import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ height: 40, width: "38%", borderWidth: 2, backgroundColor: 'green', marginBottom: 20 }}
                    onPress={() => {
                        this.props.navigation.navigate('Reminder')
                    }}>
                    <Text style={styles.textView}>Add Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 40, width: "45%", borderWidth: 2, backgroundColor: 'green' }}
                    onPress={() => {
                        this.props.navigation.navigate('ReminderList')
                    }}>
                    <Text style={styles.textView}>List of Reminders</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textView: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        alignContent: 'center'
    }
});
