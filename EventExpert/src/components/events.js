import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

// import geocoder from 'geocoder';
import Geocoder from 'react-native-geocoder';

const API_KEY = 'Bearer SZRBEN2CGEUPT57YVMXP';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      dataSource: ds.cloneWithRows([]),
      eventType: '',
      city: ''
    })
  },

  componentDidMount() {
    this.searchEvents('hackathon', 'San Francisco');
    // console.log('GooglePlacesAutocomplete', GooglePlacesAutocomplete);
  },

  getCoordinates(city) {
    Geocoder.geocodeAddress(city).then(res => {
      console.log('res', res);
      let position = res[0].position;
      console.log('position', position);
      return position;
    })
  },

  searchEvents(category, city) {

    // let cityPosition = this.getCoordinates(city)


    Geocoder.geocodeAddress(city).then(res => {
      console.log('res', res);
      let position = res[0].position;
      console.log('position', position);
      // return position;

      let locationStr = `&location.latitude=${position.lat}&location.longitude=${position.lng}`
      let FETCH_URL = `${ROOT_URL}?q=${category}`;
      FETCH_URL += locationStr;

      fetch(FETCH_URL, {
        method: 'GET',
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log('responseJSON', responseJSON);
        this.setState({dataSource: ds.cloneWithRows(responseJSON.events)});
      });
    })
    //   .then(() => {
    //       console.log('cityPosition', cityPosition);
    //   }
    // );
    // add city.lat and city.lon with https://github.com/FaridSafi/react-native-google-places-autocomplete
    // fetch('https://maps.googleapis.com/maps/api/place/autocomplete/input=Paris&types=geocode')
    //   .then((response) =>
    //   // response.json()
    //     console.log('response', response)
    //   )
      // .then((responseJSON) => {
      //   console.log('autocomplete api', responseJSON);
      // })

    // city is now an object with two coordinates, with lat and lng




    //pass the lat and long from the position in city

  },

  detail(rowData) {
    this.props.navigator.push({
      name: 'eventDetail',
      title: rowData.name.text,
      description: rowData.description.text,
      url: rowData.url,
      img: rowData.logo.url
    })
  },

  renderRow(rowData) {
    const defaultImg = 'https://pixabay.com/static/uploads/photo/2014/08/21/19/43/question-423604__180.png';
    let img = rowData.logo != null ? rowData.logo.url : defaultImg;

    return (
      <View style={styles.row}>
        <Image
          style={styles.rowLogo}
          source={{uri: img}}
        />
        <View style={styles.rowDetails}>
          <Text>
            {rowData.name.text.length > 30 ?
              `${rowData.name.text.substring(0, 30)}...` :
              rowData.name.text
            }
          </Text>
          <TouchableOpacity
            onPress={() => this.detail(rowData)}
          >
            <Text style={styles.link}>
              more details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Event Expert
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='kind of event...'
            onChangeText={(text) => this.setState({eventType: text})}
          />
          <TextInput
            style={styles.input}
            placeholder='city...'
            onChangeText={(text) => this.setState({city: text})}
          />
          <TouchableOpacity
            onPress={() => this.searchEvents(this.state.eventType, this.state.city)}
            style={styles.buttonContainer}
          >
            <Text style={styles.button}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
  },
  form: {
    flex: 4,
  },
  list: {
    flex: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  rowDetails: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowLogo: {
    flex: 1,
    width: 50,
    height: 50,
    borderColor: '#000',
    borderWidth: 1
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center'
  },
  buttonContainer: {
    flex: 1,
    padding: 5
  },
  button: {
    flex: 1,
    borderColor: '#0000FF',
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    color: '#0000FF'
  },
  link: {
    color: '#0000FF'
  }
})
