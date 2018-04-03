import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getDocumentList,
  loadTest,
}  from '../../actions'
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui'

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
}


class DocumentList extends Component {

  render() {
    console.log('props:', this.props)
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{margin: 128}}>
          <Text>This is DocumentList!!</Text>
          <Button raised primary text="Primary" />
        </View>
      </ThemeProvider>
    )
  }
}

export default DocumentList
