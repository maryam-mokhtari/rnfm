import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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

const ProfileScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}> 
      Profile Screen
    </Text>
    <Button
          onPress={() =>
            // navigation.navigate('Login')}
            navigation.dispatch({ type: 'Logout' })}
          // dispatch(NavigationActions.navigate({ routeName: 'Login' }))}
          title="Login from Tab1"
        />
  </View>
);

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
