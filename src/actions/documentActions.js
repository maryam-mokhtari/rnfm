import {AsyncStorage} from 'react-native'
import { CALL_API, RSAA } from 'redux-api-middleware'
import ActionTypes from './ActionTypes'

import {fetch} from './dynamicAction'

export const createFolder = (name) => {
  return (dispatch, getState) => {
    return dispatch(fetch('cfs/rest/documents', 'FOLDER', 'POST', {
      name,
      description: null,
      subdomain: false,
      discriminator: "D",
    },

  ))
  }
}

export const getDocuments = (type) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/documents${type==undefined? '': '/trash'}?sort=%2Bdiscriminator%2C%2Bname`,
    'DOCUMENTS', 'GET'))
  }
}

export const getChildren = (path) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/documents/children?sort=%2Bdiscriminator%2C%2Bname&path=${path}`,
    'CHILDREN', 'GET'))
  }
}

export const rename = (id, name) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/documents/rename?id=${id}`,
    'RENAME', 'PUT', {name}, id, id))
  }
}

export const remove = (ids) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/documents/trash?ids=${ids}`,
    'DELETE', 'PUT', null, ids, ids))
  }
}

export const sharepg = (ids) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/documents/share?ids=${ids}`,
    'SHAREPG', 'POST'))
  }
}
