// import React, { Component } from 'react';
// import { View, Text, TabBarIOS } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/Ionicons';
// export default class PageOne extends Component {
//   render() {
//     return (
//       <View style={{margin: 128}}>
//         <Text>This is PageOne!</Text>
//         <Icon name="ios-person" size={30} color="#4F8EF7" />
//       </View>
//     )
//   }
// }

import { connect } from "react-redux";

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ListView,
  AsyncStorage,
  Image,
} from 'react-native'
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import { getDocuments, } from "../../actions";
import Row from './Row'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let docs = []
let userData = []

class PageOne extends Component<{}> {
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
    // this.getDocuments().then((res) => this.setState({
    //   isLoading: false,
    //   dataSource: this.state.dataSource.cloneWithRows(res)
    // }))

    this.props.getDocuments().then(() => this.setState({
      isLoading: false,
      dataSource: this.state.dataSource.cloneWithRows(this.props.documents)
    }))

    // this.getUser().then(res => this.setState({
    //   userDataSource: res
    // }))
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
    return fetch('http://po.stg.persiangig.com/cfs/rest/documents?sort=%2Bdiscriminator%2C%2Bname',
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
// getUser() {
//     return fetch('http://local.persiangig.com/cfs/rest/users/currentUser',
//     {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Token': this.state.token,
//       },
//     })
//       .then(response =>  response.json())
//       .catch((error) => {
//         console.error(error);
//       });
//   }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Title
        </Text>

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
    marginTop: 20,
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

export default connect(mapStateToProps, bindAction)(PageOne)
