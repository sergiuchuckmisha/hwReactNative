/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initWssConnection} from "./src/ws";

initWssConnection()

AppRegistry.registerComponent(appName, () => App);
