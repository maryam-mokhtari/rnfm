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
    return dispatch(fetch('cfs/rest/documents?sort=%2Bdiscriminator%2C%2Bname',
    'DOCUMENTS', 'GET'))
  }
}

export const getSharedDocuments = (type) => {
  return (dispatch, getState) => {
    return dispatch(fetch('cfs/rest/sharedwithme?sort=%2Bdiscriminator%2C%2Bname',
    'SHAREDDOCUMENTS', 'GET'))
  }
}

export const getTrashDocuments = (type) => {
  return (dispatch, getState) => {
    return dispatch(fetch('cfs/rest/documents/trash?sort=%2Bdiscriminator%2C%2Bname',
    'TRASHDOCUMENTS', 'GET'))
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

export const removeForever = (ids) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/documents?ids=${ids}`,
    'REMOVEFOREVER', 'DELETE', null, ids, ids))
  }
}
export const restoreTrash = (ids) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/documents/resotre?ids=${ids}`,
    'RESTORETRASH', 'PUT', null, ids, ids))
  }
}


export const upload = (res) => {

  const data = new FormData();
  data.append('name', res.fileName)
  data.append('file', {
    uri: res.uri,
    type: 'application/pdf', //res.type,
    name: res.fileName
  });
  console.log('data:', data);

  return (dispatch, getState) => {
    return dispatch(fetch(`cfs/rest/upload/binary?path-id=0&name=${res.fileName}&size=${res.fileSize}&dlc=false&subdomain=false`,
    'UPLOAD', 'POST', data, null, null, null, false))
  }
}
