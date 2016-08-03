import {StyleSheet} from 'react-native';

const BLUE = '#64b5f6';

module.exports = StyleSheet.create({
  background: {
    backgroundColor: BLUE
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: BLUE
  },
  flexContainer: {
    flex: 1,
    backgroundColor: BLUE
  },
  list: {
    flex: 1
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 2,
    textAlign: 'center',
    fontFamily: 'Avenir'
  },
  buttonContainer: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#0000FF',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 2,
  },
  button: {
    textAlign: 'center',
  },
  feedback: {
    textAlign: 'center'
  },
  link: {
    color: 'black',
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    marginTop: 20,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    flex: 24,
    paddingRight: 20,
    paddingLeft: 20
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    padding: 10
  },
  title: {
    fontSize: 16,
    fontFamily: 'Avenir',
    textAlign: 'center'
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  }
})
