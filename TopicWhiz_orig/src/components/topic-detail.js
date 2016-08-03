import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ListView
} from 'react-native';

import styles from '../styles';
import { topicsRef } from './auth/authenticate';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      comment: null,
      comments: null,
      dataSource: ds.cloneWithRows(''),
      commentsRef: null
    })
  },

  componentDidMount() {
    const commentsRef = topicsRef.child(this.props.row_uid).child('comments');
    this.setState({commentsRef})
    this.listenForItems(commentsRef);
  },

  listenForItems(ref) {
    ref.on('value', snap => {
      let comments = [];
      snap.forEach(child => {
        let {comment, author} = child.val();
        comments.push({
          comment,
          author
        })
      })
      this.setState({
        dataSource: ds.cloneWithRows(comments)
      })
    })
  },

  renderRow(rowData) {
    console.log('rowData', rowData);
    return(
      <View style={styles.row}>
        <Text style={localStyles.comment}>
          {rowData.comment}
        </Text>
        <Text>
          by {rowData.author}
        </Text>
      </View>
    )
  },

  postComment() {
    this.state.commentsRef.push({
      comment: this.state.comment,
      author: this.props.displayName
    })
  },

  render() {
    return (
      <View style={styles.flexContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={()=>this.props.navigator.pop()}
          >
            <Text style={styles.link}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={localStyles.title}>
            {this.props.title}
          </Text>
          <Text style={localStyles.subtitle}>
            by {this.props.author}
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Add a comment...'
            onChangeText={(text) =>
              this.setState({comment: text})}
            onEndEditing={()=>this.postComment()}
          />
          <ListView
            styles={styles.list}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </View>
      </View>
    )
  }
});

const localStyles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir'
  },
  comment: {
    color: '#777',
    fontFamily: 'Avenir'
  }
})
