import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createStackNavigator, navigation, StackActions, NavigationActions } from 'react-navigation';

class Source extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Source Listing',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { textAlign: 'center', flex: 1 },
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };

  _onDetail = data => {
    // this.props.navigation.dispatch(StackActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate('Details', {info: data })
    //   ],
    // }))
    this.props.navigation.navigate('Details', { info: data });
  };
  renderItem = data => (
    <TouchableOpacity onPress={() => {
      /* 1. Navigate to the Details route with params */
      this.props.navigation.navigate('Details', {
        info: data
      });
    }}>
      <View style={styles.list}>
        <Text style={styles.lightText}>{data.item.name}</Text>
        <Text style={styles.lightText}>{data.item.email}</Text>
        <Text style={styles.lightText}>{data.item.company.name}</Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={item => item.id.toString()}
          renderItem={item => this.renderItem(item)}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: '',
    };

  }
  render() {
    const itemId = this.props.navigation.getParam('info', 'NO-ID');
    return (
      <View>
        <Text style={styles.Text}>Name: {JSON.stringify(itemId.item.name)}</Text>
        <Text style={styles.Text}>Email: {JSON.stringify(itemId.item.email)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Text: {
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: Source,
  },
  Details: {
    screen: DetailsScreen,
  },
}, {
    initialRouteName: 'Home',
  });

export default createAppContainer(AppNavigator);