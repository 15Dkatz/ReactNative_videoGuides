import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  TouchableOpacity
} from 'react-native';

import styles from '../styles';
import { topicsRef } from './auth/authentication';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      comment: '',
      dataSource: ds.cloneWithRows(''),
      commentsRef: ''
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
        comments.push({
          comment: child.val().comment,
          author: child.val().author
        })
      })
      this.setState({dataSource: ds.cloneWithRows(comments)});
    })
  },

  postComment() {
    this.state.commentsRef.push({
      comment: this.state.comment,
      author: this.props.displayName
    })
  },

  renderRow(data) {
    return (
      <View style={styles.row}>
        <Text style={styles.comment}>
          {data.comment}
        </Text>
        <Text>
          {data.author}
        </Text>
      </View>
    )
  },

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
          <TextInput
            style={styles.input}
            placeholder='Add your thoughts'
            onChangeText={(text) => this.setState({comment: text})}
            onEndEditing={() => this.postComment()}
          />
          <ListView
            style={styles.list}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </View>
      </View>
    )
  }
})
