import React, { Component } from 'react';

import {
   // Modal,
   Text,
   TouchableHighlight,
   View,
   StyleSheet
}
from 'react-native'
import Modal from 'react-native-modal'
class ModalExampleScreen extends Component {
   state = {
      modalVisible: false,
   }
   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }
   render() {
      return (
         <View style = {styles.container}>
            <Modal
               isVisible = {this.state.modalVisible}>
               <View style = {styles.modal}>
                  <Text style = {styles.text}>Modal is open!</Text>

                  <TouchableHighlight onPress = {() => {
                     this.toggleModal(!this.state.modalVisible)}}>

                     <Text style = {styles.text}>Close Modal</Text>
                  </TouchableHighlight>
               </View>
            </Modal>

            <TouchableHighlight onPress = {() => {this.toggleModal(true)}}>
               <Text style = {styles.text}>Open Modal</Text>
            </TouchableHighlight>
         </View>
      )
   }
}

// ModalExampleScreen.navigationOptions = {
//   title: 'Modal',
// };

export default ModalExampleScreen;


const styles = StyleSheet.create ({
   container: {
     flex: 1,
      alignItems: 'center',
      backgroundColor: '#ede3f2',
      padding: 100
   },
   m: {
     // backgroundColor: 'transparent',
   },
   modal: {
      // flex: 1,
      alignItems: 'center',
      backgroundColor: 'pink',
      padding: 100,
      // height: 100,
   },
   text: {
      color: '#3f2949',
      marginTop: 10
   }
})
