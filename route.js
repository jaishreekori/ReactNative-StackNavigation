import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Reminder from './Reminder';
import ReminderList from './ReminderList';
import DetailScreen from './Details';


const MainNavigator = createStackNavigator({
    Home: { screen: Home },
    Reminder: { screen: Reminder },
    ReminderList: { screen: ReminderList },
    Details: { screen: DetailScreen },
    initialRouteName: 'Home',
});

const Route = createAppContainer(MainNavigator);

export default Route;
