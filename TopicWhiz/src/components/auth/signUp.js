import React, { Component } from 'react';
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      result: ''
    })
  },

  //when we create the user, the mounted signIn component gets recognized
  signUp() {
    let {email, password} = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      console.log('errorCode', error.code, 'errorMessage', error.message);
      this.setState({result: error.message});
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
        <TextInput
          placeholder='Password'
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        <TouchableOpacity
          onPress={()=>this.signUp()}
          style={styles.buttonContainer}
        >
          <Text style={styles.button}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigator.pop()
          }}
        >
          <Text style={styles.link}>
            Already signed up? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});
