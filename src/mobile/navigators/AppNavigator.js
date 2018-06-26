import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator }
  from 'react-navigation';
import { Button, Text, Footer, FooterTab, ActionSheet } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux'
import { logoutUser } from "../../actions";
import Login from '../auth/Login';
import Upload from '../Upload';
import Logout from '../auth/Logout';
import Signup from '../auth/Signup';
import Home from '../Home';
import Shared from '../Shared';
import Trash from '../Trash';
import HomeScreen from '../HomeScreen';
import SharedScreen from '../SharedScreen';
import Documents from '../Documents';
import Document from '../Document';

import {setTab, } from "../../actions"

const CANCEL_INDEX = 0;

const SETTINGBUTTON = [
  { text: " ", icon: "close", iconColor: "#4f8ef7" },
  { text: "خروج", icon: "power-off", iconColor: "#4f8ef7" },
];

const settingPress = (props) => {
  ActionSheet.show(
    {
      options: SETTINGBUTTON,
      cancelButtonIndex: CANCEL_INDEX,
      title: ""
    },
    buttonIndex => {
      switch (buttonIndex) {
        case 1:
          console.log('AppNavigator settingPress pp', props);
          props.navigation.navigate("Logout")
          break;
      }
    // )
    }
  )
}
//
// const HomeNavigator = StackNavigator({
//   Home: {screen: Home, },
//   Document: {screen: Document, },
// },
//
// {
//   headerMode: 'none',
//   cardStyle: {
//     backgroundColor: 'white',
//   },
// }
// )
//
// const SharedNavigator = StackNavigator({
//   Shared: {screen: Shared, },
//   Document: {screen: Document, },
// },
//
// {
//   headerMode: 'none',
//   cardStyle: {
//     backgroundColor: 'white',
//   },
// }
// )
//
// const TrashNavigator = StackNavigator({
//   Trash: {screen: Trash, },
// },
// {
//   headerMode: 'none',
//   cardStyle: {
//     backgroundColor: 'white',
//   },
// }
// )
//
// const SettingsNavigator = StackNavigator({
//   Home: {screen: Home, },
// },
// {
//   headerMode: 'none',
//   cardStyle: {
//     backgroundColor: 'white',
//   },
// }
// )

const MainNavigator = TabNavigator(
  {
    HomeNavigator: { screen: Home },
    SharedNavigator: { screen: Shared },
    TrashNavigator: { screen: Trash },
    SettingsNavigator: { screen: Home },
  },

  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      console.log('tabBarComponent', this.props);
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() =>
                {console.log('tabBarComponent:home')
                props.navigation.navigate("HomeNavigator", { type: "home"})}
              }>
              <Icon name="home" size={25} color="#2ca6e0" />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() =>
                {console.log('tabBarComponent:shared')
                props.navigation.navigate("SharedNavigator", { type: "shared"})}
              }>
              <Icon name="user-circle" size={25} color="#2ca6e0" />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() =>
                {console.log('tabBarComponent:trash')
                props.navigation.navigate("TrashNavigator", { type: "trash"})}
              }>
              <Icon name="trash" size={25} color="#2ca6e0" />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 3}
              onPress={() => settingPress(props)}>
              <Icon name="cog" size={25} color="#2ca6e0" />
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  },
);

export const AppNavigator = StackNavigator({
  MainNavigator: { screen: MainNavigator },
  Document: {screen: Document, },
  Upload: {screen: Upload},
  Login: { screen: Login },
  Logout: { screen: Logout },
},
  {
  navigationOptions: {
    headerRight: <Button title="Info" />
  },
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
    },
  }
)

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);


const mapStateToProps = state => ({
  nav: state.nav,
});


export default connect(mapStateToProps)(AppWithNavigationState);
