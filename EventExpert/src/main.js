import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import events from './components/events';
import event_detail from './components/event-detail';

const routes = {
  events,
  event_detail
}

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{name: 'events'}}
        renderScene={this.renderScene}
      />
    )
  },

  renderScene(route, navigator) {
    let Component = routes[route.name];
    let { title, description, url, img } = route;
    return (
      <Component
        navigator={navigator}
        title={title}
        description={description}
        url={url}
        img={img}
      />
    )
  }
})
