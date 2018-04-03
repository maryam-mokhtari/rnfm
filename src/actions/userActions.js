import {AsyncStorage} from 'react-native'
import { CALL_API, RSAA } from 'redux-api-middleware'
import ActionTypes from './ActionTypes'

import {fetch} from './dynamicAction'

export const login = (username, password) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/auth?email=${username}&userPassword=${password}`, 'LOGIN', 'GET', null, null, null,
        true, false, {}, false))
  }
}


export const loadCurrentUser = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('cfs/rest/users/currentUser', 'CURRENTUSER',))
  }
}

export const logoutUser = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/users/signout', 'LOGOUT',))
  }
}
