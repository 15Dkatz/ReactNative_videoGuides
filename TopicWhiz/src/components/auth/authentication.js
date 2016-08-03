import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAITcRJRhrwvGeyePprbLh1-j2oJsGthKk",
  authDomain: "topicwhiz.firebaseapp.com",
  databaseURL: "https://topicwhiz.firebaseio.com",
  storageBucket: ""
};

export const firebaseApp = firebase.initializeApp(config);
export const topicsRef = firebase.database().ref();
