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
import Logout from '../auth/Logout';
import Signup from '../auth/Signup';
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

const HomeNavigator = StackNavigator({
  Documents: {screen: Documents, },
  Document: {screen: Document, },
},

{
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
}
)

const SharedNavigator = StackNavigator({
  Documents: {screen: Documents, },
  Document: {screen: Document, },
},

{
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
}
)

const TrashNavigator = StackNavigator({
  Documents: {screen: Documents, },
},
{
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
}
)

const SettingsNavigator = StackNavigator({
  Documents: {screen: Documents, },
},
{
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
}
)
//
// const AppNavigator1 = StackNavigator({
//   Login1: {
//     screen: LoginScreen,
//     // screenProps: {tintColor: 'red'}
//     // path: 'people/:name',
//     // navigationOptions: {headerTintColor: 'orange',},
//     navigationOptions: {title: 'LOG IN'},
//   },
//   Main: { screen: MainScreen },
//   Profile: { screen: ProfileScreen },
//   IconBtn: { screen: IconBtnScreen },
//   ModalExample: { screen: ModalExampleScreen },
// },
// );
//
// const AppNavigator2 = StackNavigator({
//   Login2: { screen: Login },
//   Profile2: { screen: ProfileScreen },
// },
// {
//   headerMode: 'none',
//   cardStyle: {
//     backgroundColor: 'red',
//   },
// })

const MainNavigator = TabNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    SharedNavigator: { screen: SharedNavigator },
    SettingsNavigator: { screen: SettingsNavigator },
    TrashNavigator: { screen: TrashNavigator },
    // LoginModalNavigator: { screen: AppNavigator2 },
    // NativeBaseNavigation: { screen: NativeBaseNavigation },
  },

  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      console.log('tabBarComponent', this.props);
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("HomeNavigator")}>
              <Icon name="home" size={25} color="#2ca6e0" />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("SharedNavigator")}>
              <Icon name="user-circle" size={25} color="#2ca6e0" />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("TrashNavigator")}>
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
  Login: { screen: Login },
  Logout: { screen: Logout },
  // Signup: { screen: Signup },
},
  {
  navigationOptions: {
    headerRight: <Button title="Info" />
  },
    headerMode: 'none',
    // mode: 'modal',
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
