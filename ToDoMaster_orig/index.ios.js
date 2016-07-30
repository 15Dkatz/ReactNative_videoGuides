/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './src/main';

class ToDoMaster extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('ToDoMaster', () => ToDoMaster);
