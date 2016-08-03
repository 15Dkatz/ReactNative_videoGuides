import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../styles';

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.flexContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigator.pop()}
          >
            <Text style={styles.link}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.detailTitle}>
            {this.props.title}
          </Text>
          <Text style={styles.detailSubtitle}>
            {this.props.author}
          </Text>
        </View>
      </View>
    )
  }
})
