import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ListView
} from 'react-native';

import styles from '../styles';;
import { firebaseApp, topicsRef } from './auth/authenticate';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      displayName: '',
      email: '',
      title: '',
      dataSource: ds.cloneWithRows([''])
    })
  },

  componentDidMount() {
    let user = firebase.auth().currentUser;
    console.log('user', user);
    if (!user.displayName) {
      this.props.navigator.push({
        name: 'chooseName'
      })
    } else {
      this.setState({
        displayName: user.displayName,
        email: user.email
      })
      // populate the list of topics
      this.listenForItems(topicsRef);
    }
  },

  listenForItems(ref) {
    let topics = [];
    ref.on('value', (snap) => {
      let topics = [];
      snap.forEach(topic => {
        let {title, author} = topic.val();
        let {key} = topic;
        topics.push({
          title,
          author,
          key
        })
      })
      this.setState({
        dataSource: ds.cloneWithRows(topics)
      })
    })
  },

  detail(data) {
    console.log('data', data);
    let {email, displayName} = this.state;
    let {title, author, key} = data;
    this.props.navigator.push({
      name: 'topicDetail',
      displayName: this.state.displayName,
      email: this.state.email,
      title: data.title,
      author: data.author,
      // cannot set value of row_uid to 'key' since 'key' is a special JSON key
      row_uid: data.key
    })
  },

  renderRow(rowData) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.detail(rowData)}
      >
        <Text style={styles.rowTitle}>
          {rowData.title}
        </Text>
        <Text>
          by {rowData.author}
        </Text>
      </TouchableOpacity>
    )
  },

  addTopic() {
    topicsRef.push({
      title: this.state.title,
      author: this.state.displayName
    })
  },

  signOut() {
    firebaseApp.auth().signOut().then(() => {
      // Sign-out successful.
      this.props.navigator.popToTop();
    }, (error) => {
      // An error happened.
      console.log(error);
    });
  },

  render() {
    return (
      <View style={styles.flexContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={()=>this.signOut()}
          >
            <Text style={styles.link}>
              Log out
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {this.state.displayName}
          </Text>
        </View>
        <View style={styles.body}>
          <TextInput
            placeholder='Something on your mind?'
            style={styles.input}
            onChangeText={(text)=>this.setState({title: text})}
            onEndEditing={()=>this.addTopic()}
          />
          <ListView
            style={styles.list}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </View>
      </View>
    );
  }
})
