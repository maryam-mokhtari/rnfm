/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Row from './Row'
import { connect } from "react-redux";

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  AsyncStorage,
  Image,
} from 'react-native'
import { getDocuments, } from "./src/actions";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let docs = []
let userData = []
AsyncStorage.setItem('token', "O58hj9WyhQFWYPjRGB80JQ==")

class App extends Component<{}> {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(docs),
      userDataSource: ds.cloneWithRows(userData),
      isLoading: true,
      token: '',
      // rovers: [],
    };
  }
  async stateSet() {
    await AsyncStorage.getItem('token').then(token => this.setState({
      token,
    }))
    this.getDocuments().then(res => this.setState({
      isLoading: false,
      dataSource: this.state.dataSource.cloneWithRows(res)
    }))
    this.getUser().then(res => this.setState({
      userDataSource: res
    }))
  }
  componentDidMount() {
    this.stateSet()
    // api.getRovers().then(res => this.setState({ rovers: res.rovers }))
  }
  // async function getMoviesFromApi() {
  //   try {
  //     let response = await fetch('https://facebook.github.io/react-native/movies.json');
  //     let responseJson = await response.json();
  //     return responseJson.movies;
  //   } catch(error) {
  //     console.error(error);
  //   }
  // }
getDocuments() {
    return fetch('http://local.persiangig.com/cfs/rest/documents?sort=%2Bdiscriminator%2C%2Bname',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': this.state.token,
      },
    })
      .then((response) => {
        const res = response.json();
        console.log('response:', res);
        return res
      })
      .catch((error) => {
        console.error(error);
      });
  }
getUser() {
    return fetch('http://local.persiangig.com/cfs/rest/users/currentUser',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': this.state.token,
      },
    })
      .then(response =>  response.json())
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.state.userDataSource.username}

        </Text>
        {this.state.isLoading?
          <Text>Loading...</Text>:
          <Text></Text>
        }

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function bindAction(dispatch) {
  return {
    getDocuments: () => dispatch(getDocuments()),
  };
}
const mapStateToProps = state => ({
  documents: state.entities.documents,
});

export default App //connect(mapStateToProps, bindAction)(App)
