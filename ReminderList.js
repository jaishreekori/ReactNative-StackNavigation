import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ReminderList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        }
    }
    componentDidMount() {
         this.getData()
        let task = this.props.navigation.state.params.tasks;
        let allTasks = this.state.tasks;
        allTasks.push(task);
        this.setState({ tasks: allTasks });
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('tasks')
            console.log('test'+ value)
            if (value !== null) {
                this.setState({ tasks: [JSON.parse(value)] })
            }
        } catch (e) {
            alert(e)
        }
    }
    deleteTask = i => {
        this.setState(
            prevState => {
                let tasks = prevState.tasks.slice();
                tasks.splice(i, 1);
                return { tasks: tasks };
            },
            // () => Tasks.save(this.state.tasks)
        );
    };
    viewReminder = (data) => {
        this.props.navigation.navigate('Details', { info: data })
    }
    editReminder = (data) => {
        this.props.navigation.navigate('Reminder', { info: data })
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
                    renderItem={({ item, index }) =>
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

                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ height: 25, width: 50, backgroundColor: 'purple', marginLeft: 30, marginBottom: 7 }}
                                    onPress={() => this.viewReminder(item)}>
                                    <Text style={styles.buttonView}>View</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 25, width: 50, backgroundColor: 'blue', marginLeft: 30, marginBottom: 7 }}
                                    onPress={() => this.editReminder(item)}>
                                    <Text style={styles.buttonView}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 25, width: 50, backgroundColor: 'red', marginLeft: 30 }}
                                    onPress={() => this.deleteTask(index)}>
                                    <Text style={styles.buttonView}>Delete</Text>
                                </TouchableOpacity>
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
    buttonView: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
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
        color: 'black'
    },
    hr: {
        height: 1,
        backgroundColor: 'black'
    },
    listItemCont: {
        width: "70%",
        flexDirection: "column",
        borderWidth: 2,
        marginBottom: 20,
        justifyContent: "space-between"
    },
})
