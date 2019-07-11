import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TimePickerAndroid,
    DatePickerAndroid,
    TextInput,
    AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
const reminderArr = [];

export default class Reminder extends Component {
    constructor() {
        super();
        this.setDate = this.setDate.bind(this);
        this.state = {
            chosenDate: new Date(),
            tasks: [
                { chosenAndroidTime: '00:00' },
                { text: '' },
                {
                    androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() +
                        1}/${new Date().getUTCFullYear()}`
                },
            ]
        };
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    setDateAndroid = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ androidDate: `${day}/${month + 1}/${year}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    setTimeAndroid = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                const m = minute < 10 ? `0${minute}` : minute;
                const h = hour < 10 ? `0${hour}` : hour;
                console.log(`time: ${hour}:${minute}`);
                this.setState({ chosenAndroidTime: `${h}:${m}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    };

    changeText = (text) => {
        this.setState({ text: text })
    }
    saveReminder = () => {
        reminderArr.push(this.getReminder())
        this.storeData(reminderArr)
    }

    getReminder() {
        return (
            {
                androidDate: this.state.androidDate,
                chosenAndroidTime: this.state.chosenAndroidTime,
                text: this.state.text,
            }
        )
    }

    storeData = async (value) => {
        console.log("storeData " + JSON.stringify(value))
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(value))
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    setValue = (value) => {
        console.log("test " + JSON.stringify(value))
        AsyncStorage.setItem('tasks', value);
        console.log(this.state.tasks)
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.setDateAndroid()}
                    style={{ margin: 10, height: 50, width: "80%", borderWidth: 2, borderColor: 'black', marginBottom: 20, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, alignContent: 'center' }}>{this.state.androidDate}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.setTimeAndroid()}
                    style={{ margin: 10, marginBottom: 20, height: 50, width: "80%", borderWidth: 2, borderColor: 'black', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, alignContent: 'center' }}>{this.state.chosenAndroidTime}</Text>
                </TouchableOpacity>
                <TextInput style={{ height: 50, width: "80%", borderWidth: 2, borderColor: 'black', margin: 10, alignSelf: 'center' }}
                    onChangeText={this.changeText}
                    value={this.state.text}
                />
                <TouchableOpacity style={{ height: 40, width: "40%", borderWidth: 2, backgroundColor: 'green', marginTop: 50, alignSelf: 'center' }}
                    onPress={this.saveReminder}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, alignContent: 'center' }}>Save Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 40, width: "40%", borderWidth: 2, backgroundColor: 'green', marginTop: 50, alignSelf: 'center' }}
                    onPress={() => {
                        this.props.navigation.navigate('ReminderList', {
                            tasks:this.state.tasks
                        });
                    }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', margin: 10, alignContent: 'center' }}>Go To Reminder</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },

});