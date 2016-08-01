import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import signIn from './components/signIn';

const routes = {
  signIn
}

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{name: 'signIn'}}
        renderScene={this.renderScene}
      />
    )
  },

  renderScene(route, navigator) {
    let Component = routes[route.name];
    return (
      <Component
        navigator={navigator}
      />
    )
  }
})
