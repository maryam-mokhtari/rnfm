import React, {Component} from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { View, } from 'react-native'
import { login, loadCurrentUser, logoutUser } from "../../actions";

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
    this.props.navigation.navigate("Login")
  }
  render() { return <View /> }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({login, loadCurrentUser, logoutUser }, dispatch)
}
const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
