import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
// import {pushState} from 'redux-router'

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      let cookies = document.cookie.split(';')
      let tokenValue = null
      for (const i in cookies) {
        if (cookies[i].indexOf('token')!=-1) {
          tokenValue = cookies[i].split('=')[1]
        }
      }
      // if (!this.props.isAuthenticated) {
      if (!tokenValue) {

        let redirectAfterLogin = this.props.location.pathname;
        // this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
        // this.props.dispatch(push(null, `/login?next=${redirectAfterLogin}`));
        // location.assign('http://local.persiangig.com/auth/')
      }
    }

    render() {
      let cookies = document.cookie.split(';')
      let tokenValue = null
      for (const i in cookies) {
        if (cookies[i].indexOf('token')!=-1) {
          tokenValue = cookies[i].split('=')[1]
        }
      }
      return (
        <div>
        {
          // this.props.isAuthenticated === true
          tokenValue
          ? <Component {...this.props}/>
          : null
        }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    // const { token, isAuthenticated, name } = state.user
    token: state.user.token,
    name: state.user.name,
    // userName: state.user.userName,
    isAuthenticated: state.entities.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);

}
