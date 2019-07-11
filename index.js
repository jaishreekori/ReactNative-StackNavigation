import {AppRegistry} from 'react-native';
import App from './App';
import createAppContainer from './component/route';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => createAppContainer);
