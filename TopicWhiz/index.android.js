import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Main from './src/main';

class TopicWhiz extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('TopicWhiz', () => TopicWhiz);
