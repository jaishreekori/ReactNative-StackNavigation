import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ReminderList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        }
    }
    componentDidMount() {
        let task = this.props.navigation.state.params.tasks;
        let allTasks = this.state.tasks;
        allTasks.push(task);
        this.setState({ tasks: allTasks });
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('tasks')
            if (value !== null) {
                this.setState({ tasks: value })
            }
        } catch (e) {
            alert(e)
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Upcoming Reminders
                </Text>
                <FlatList
                    style={styles.list}
                    data={this.state.tasks}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%" }}>
                            <View style={styles.listItemCont}>
                                <Text style={styles.listItem}>
                                    Task:  {item.text}
                                </Text>
                                <Text style={styles.listItem}>
                                    Date: {item.androidDate}
                                </Text>
                                <Text style={styles.listItem}>
                                    Time: {item.chosenAndroidTime}
                                </Text>
                            </View>
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
                            <View style={styles.hr} />
                        </View>}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                />
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
