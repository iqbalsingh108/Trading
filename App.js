import React from 'react';
import {LogBox} from 'react-native';

import App from './src/screens/Home';

LogBox.ignoreAllLogs();

const ReduxApp = () => {
  return <App />;
};

export default ReduxApp;
