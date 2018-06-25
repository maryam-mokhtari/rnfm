import React from 'react'
import { Text, View, Button, StyleSheet, } from 'react-native'
// import {Button} from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

})

const Plans = ({navigation}) => (
  <View style={styles.container}>
    <Text>
      Plans
    </Text>
  </View>
)

Plans.navigationOptions = {
  title: 'Plans'
}

export default Plans
