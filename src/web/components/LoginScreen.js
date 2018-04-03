import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
});

const LoginScreen = (props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Screen A
    </Text>
    <Text style={styles.instructions}>
      This is great
      {JSON.stringify(props)}
    </Text>
    <Button
      onPress={
        () => props.navigation.dispatch({ type: 'Login' })
      }
      title="Log in"
    />
  </View>
);

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
//
// LoginScreen.navigationOptions = ({ navigation, screenProps }) => ({
//     // title: navigation.state.params.name + "'s Profile!",
//     headerRight: <Button color={screenProps.tintColor} title="testttt" />,
//   });
//{
  // title: `${props.navigation.state.params.name}'s Profile'`,
  // title: 'Log Ino',

//};

export default LoginScreen;
