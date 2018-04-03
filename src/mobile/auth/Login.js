import React, {Component} from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { Text, View, StyleSheet, Image, } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Toast, } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation'
import crypto from 'crypto'
import '../../../shim.js'
import { login, loadCurrentUser } from "../../actions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 50,
  },
  title: {
    textAlign: 'center',
    color: '#337ab7',

  },
  button: {
    margin: 20,
    backgroundColor: '#42baf7',
  }
})

class Login extends Component {
  async login() {
    console.log('this::', this);
    this.props.loadCurrentUser()
    await this.props.login(this.username.props.value,
      crypto.createHash('sha1').update(this.password.props.value).digest('hex')
    )
    if (this.props.isAuthenticated == false) {
      Toast.show({
              text: 'نام کاربری یا گذرواژه درست نیست',
              type: 'danger',
              duration: 3000,
              position: 'bottom',
              buttonText: 'x'
            })
    }
    //this.props.navigation.dispatch({type: 'Login'})
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content style={styles.container}>
          <Image style={{width: 155, height: 40, marginLeft: '25%'   }}
          source={require('../../img/persiangig.png')} />
          <Form>
            <Item floatingLabel last>
              <Label>نام کاربر</Label>
              <Input getRef={ (c) => this.username = c }
                autoCapitalize = 'none'
                />
            </Item>
            <Item floatingLabel last>
              <Label>رمز عبور</Label>
              <Input  secureTextEntry={true} getRef={ (c) => this.password = c }
                autoCapitalize = 'none'
                />
            </Item>
            <Button block style={styles.button}
              onPress={() => {
                this.login()
              }}>
              <Text>ورود</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({login, loadCurrentUser }, dispatch)
}
const mapStateToProps = state => ({
  isAuthenticated: state.entities.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
