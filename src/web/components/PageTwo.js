import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

export default class PageOne extends Component {
  constructor(props) {
    super(props)
    this.state = {switchValue: true}
  }
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>
        {/*<Icon name="ios-person" size={30} color="#4F8EF7" />*/}
        This is PageTwo!</Text>
        <Switch value={this.state.switchValue}
        onValueChange={() => this.setState({switchValue: !this.state.switchValue})}
        />
      </View>
    )
  }
}
