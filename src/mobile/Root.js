import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Root, Toast } from 'native-base'
import AppWithNavigationState from './navigators/AppNavigator'

const contents = (<View><Text>hello</Text></View>)

export default class RootProj extends Component {

    render() {
        const { store } = this.props;
        // return <View><Text>helo</Text></View>
        return (
            <Provider store={store}>
              <Root>
                <AppWithNavigationState />
              </Root>
            </Provider>
        )
    }
}
