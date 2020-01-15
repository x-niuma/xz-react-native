// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/xz/App';

// import App from './src/demo/nav-scroll';
// import App from './src/demo/animated/App2';
// import App from './src/demo/sticky-header/App';
// import App from './src/demo/react-navition/App';
// import App from './src/demo/float-input/App2';
// import App from './src/demo/react-native-scrollable-tab-view/App1';
// import App from './src/demo/react-native-tab-view/App1';

// import App from './src/demo/ActivityIndicator/App';
// import App from './src/widget/Modal/App';
// import App from './src/demo/amap/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
