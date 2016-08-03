import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator
} from 'react-native';

import signIn from './components/auth/signIn';
import signUp from './components/auth/signUp';
import forgotPassword from './components/auth/forgotPassword';
import chooseName from './components/auth/chooseName';
import topics from './components/topics';
import topicDetail from './components/topic-detail';
import styles from './styles';

let routes = {
  signIn,
  signUp,
  forgotPassword,
  chooseName,
  topics,
  topicDetail
}

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{name: 'signIn'}}
        renderScene={this.renderScene}
        configureScene={() => {return Navigator.SceneConfigs.FloatFromRight}}
        style={styles.background}
      />
    )
  },

  renderScene(route, navigator) {
    let Component = routes[route.name];
    let {email, displayName, title, author, row_uid} = route;

    return (
      <Component
        navigator={navigator}
        email={email}
        // for topic-detail
        displayName={displayName}
        title={title}
        author={author}
        row_uid={row_uid}
      />
    )
  }
});
