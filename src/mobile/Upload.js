import React from 'react'
import { Text, View, Button, StyleSheet, } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
// import {Button} from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

})

const Upload = ({navigation}) => (
  <View style={styles.container}>
    <Text>
      Upload
    </Text>
  </View>
)

Upload.navigationOptions = {
  title: 'Upload'
}

export default Upload
