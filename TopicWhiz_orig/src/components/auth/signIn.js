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
    return({
      email: '',
      password: '',
      result: ''
    })
  },

  //mounted Component throughout the whole application
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigator.push({
          name: 'topics'
        })
      }
    });
  },

  signIn() {
    console.log('attempting a sign in');
    let { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({result: error.message})
      })
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
          onPress={() => this.signIn()}
          style={styles.buttonContainer}
        >
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <TouchableOpacity
            onPress={()=>{
              this.props.navigator.push({
                name: 'forgotPassword'
              })
            }}
          >
            <Text style={styles.link}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{
              this.props.navigator.push({
                name: 'signUp'
              })
            }}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});
