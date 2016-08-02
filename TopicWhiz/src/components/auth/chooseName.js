import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../../styles';
import {firebaseApp} from './authenticate';

module.exports = React.createClass({
  getInitialState() {
    return ({
      name: '',
    })
  },

  updateDisplayName() {
    // look at the current user state and update the display Name
    let user = firebaseApp.auth().currentUser;
    user.updateProfile({
      displayName: this.state.name,
    }).then(() => {
      this.props.navigator.push({
        name: 'topics'
      });
    });
    // navigate to topics
  },

  render() {
    // give the user an input where they choose a displayName
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Choose a display name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({name: text})}
        />
        <TouchableOpacity
          onPress={() => this.updateDisplayName()}
          style={styles.buttonContainer}
        >
          <Text style={styles.button}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
})
