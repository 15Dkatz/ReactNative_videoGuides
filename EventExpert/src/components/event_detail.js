import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text> Event Detail</Text>
        <Text>{this.props.title}</Text>
        <Text>{this.props.url}</Text>
        <Text>{this.props.img}</Text>
        <Text>{this.props.description}</Text>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
