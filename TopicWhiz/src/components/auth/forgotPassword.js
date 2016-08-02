import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import styles from '../../styles';
import { firebaseApp } from './authenticate';

module.exports = React.createClass({
  getInitialState() {
    return ({
      email: '',
      result: ''
    })
  },

  changePassword() {
    firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(() => {
      // Email sent.
      this.setState({result: 'Successfully sent a password reset email'})
    }, (error) => {
      // An error happened.
      this.setState({result: `${error}`})
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.feedback}>{this.state.result}</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={(text)=>{
            this.setState({
              email: text
            })
          }}
        />
        <View style={styles.links}>
          <TouchableOpacity
            onPress={()=>this.props.navigator.pop()}
          >
            <Text style={styles.link}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.changePassword()}
          >
            <Text style={styles.button}>
              Send Reset Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
})
