import React from 'react'
import { Text, View, Button, StyleSheet, } from 'react-native'
// import {Button} from 'native-base'
import { NavigationActions } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

})

const Signup = ({navigation}) => (
  <View style={styles.container}>
    <Text>
      Sign up
    </Text>
    <Button onPress={() => navigation.dispatch({type: 'Signup'})}
    title="Signup" />
  </View>
)

Signup.navigationOptions = {
  title: 'Signup'
}

export default Signup
