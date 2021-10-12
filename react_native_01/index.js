/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// 새로운 컴퍼넌트 등록
AppRegistry.registerComponent(appName, () => App);
