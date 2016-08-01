import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Linking
} from 'react-native';

module.exports = React.createClass({
  openUrl(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open ${url}`);
      }
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigator.pop()}
          >
            <Text style={styles.link}>
              back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.openUrl(this.props.url)}
          >
            <Text style={styles.link}>
              full details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Image
            style={styles.detailImg}
            source={{uri: this.props.img}}
          />
          <Text style={styles.title}>{this.props.title}</Text>
          <ScrollView style={styles.description}>
            <Text>{this.props.description}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    flex: 19,
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: '#0000FF'
  },
  detailImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 5
  },
  description: {
    padding: 10
  }
})
