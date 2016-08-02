import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD1JydMGsYBVLTXKvDKn-8rjlESFn3NXzs',
  authDomain: 'hope-b302f.firebaseapp.com',
  databaseURL: 'https://hope-b302f.firebaseio.com',
  storageBucket: '',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const topicsRef = firebaseApp.database().ref();
