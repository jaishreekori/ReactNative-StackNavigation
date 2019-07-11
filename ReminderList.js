import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ReminderList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            data: ''
        }
    }
    componentDidMount() {
        this.getData();
        // AsyncStorage.getItem('tasks').then((value) => this.setState({ tasks: value }))
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('tasks')
            console.log("getData " + value)
            this.setState({ data: value })
            if (value !== null) {
                // value previously stored
                // this.setState({ tasks: value })
                // setTimeout(() => {
                //     console.log("getData1 " + JSON.stringify(value))
                // }, 50);
            }
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }

    render() {
        const { navigation } = this.props;
        const tasks = navigation.getParam('tasks', [])
        // const androidDate = navigation.getParam('androidDate')
        // const chosenAndroidTime = navigation.getParam('chosenAndroidTime')
        // const text = navigation.getParam('text')
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Upcoming Reminders
                </Text>
                {
                    tasks.map((item) => {
                        return (
                            <View>
                                <Text>{item.androidDate}</Text>
                                <Text>{item.chosenAndroidTime}</Text>
                                <Text>{item.text}</Text>
                            </View>
                        )
                    })
                }
                {/* <FlatList
                    style={styles.list}
                    data={this.state.data}
                    renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%" }}>
                            <View style={styles.listItemCont}>
                                <Text style={styles.listItem}>
                                    Task:  {JSON.stringify(text)}
                                </Text>
                                <Text style={styles.listItem}>
                                    Date:  {JSON.stringify(androidDate)}
                                </Text>
                                <Text style={styles.listItem}>
                                    Time:  {JSON.stringify(chosenAndroidTime)}
                                </Text>
                            </View> */}
                {/* <TouchableOpacity
                                    style={{ height: 20, width: 20, marginLeft: 5 }}
                                    onPress={() => this.checkViewMethod(item, index)}>
                                    {item.isSelected === true ?
                                        <View style={{ height: 20, width: 20, backgroundColor: 'blue', marginLeft: 5 }}>
                                        </View>
                                        :
                                        <View style={{ height: 20, width: 20, borderColor: 'black', borderWidth: 3, marginLeft: 5 }}></View>
                                    }
                                </TouchableOpacity> */}
                {/* <View style={styles.hr} />
                        </View>}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    heading: {
        color: 'black',
        fontFamily: 'Helvetica',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    list: {
        marginTop: 30,
        marginLeft: 20,
        width: "100%",
    },
    listItem: {
        margin: 5,
        fontSize: 18,
    },
    hr: {
        height: 1,
        backgroundColor: "black"
    },
    listItemCont: {
        width: "92%",
        flexDirection: "column",
        borderWidth: 2,
        marginBottom: 20,
        justifyContent: "space-between"
    },
})