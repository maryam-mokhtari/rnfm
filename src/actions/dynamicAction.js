import {AsyncStorage} from 'react-native'
import { CALL_API, RSAA } from 'redux-api-middleware'
import ActionTypes from './ActionTypes'
import {BASEURL} from '../utils'

// const BASEURL = 'http://po.stg.persiangig.com/'

export async function fetch (endpoint, actionType, method = 'GET', body, metaRequest, metaSuccess,
    isHeaderContent = true, isHeaderAccept = true, headers = {}, isToken = true) {
  console.log('fetch:', BASEURL, endpoint, actionType, method, body, metaRequest, metaSuccess,
  isHeaderContent, isHeaderAccept, headers);
  const token = await AsyncStorage.getItem('token')
  if (!endpoint.startsWith('http')) {
    endpoint =  BASEURL + '/' + endpoint
  }
  // let headers = {}
  //---------- upload exception ----------
  if (isHeaderContent == null) {
    headers['Content-Type'] = 'multipart/form-data'
  }
  //----------
  else if (isHeaderContent) {
    headers['Content-Type'] = 'application/json'
  }
  if (isHeaderAccept) {
    headers['Accept'] = 'application/json'
  }
  if (isToken) {
    headers['Token'] = token
  }
  console.log('headers is : ', headers)
  let request = {
    type: ActionTypes[actionType + '_REQUEST']
  }
  let success = {
    type: ActionTypes[actionType + '_SUCCESS'],
    payload: (action, state, response) => {
      console.log('success', actionType);
      if (response.headers.get('Content-Range')) {
        return response.json().then(data => ({
          data: data,
          range: response.headers.get('Content-Range')
        }))
      }
      return response.json()
    },
  }
  let failure = {
    type: ActionTypes[actionType + '_FAILURE'],
    payload: (action, state, response) => {
      return response.json()
    },
  }
  if (metaRequest) {
    request.meta = metaRequest
  }
  if (metaSuccess) {
    success.meta = metaSuccess
  }
  let rsaa = {
    endpoint,
    method,
    // credentials: 'include',
    types: [
      request,
      success,
      failure
    ],
  }
  rsaa.headers = headers
  if (body) {
    rsaa.body = JSON.stringify(body)
  }
  console.log('RSAA', rsaa);
  return {
    [RSAA]: rsaa
  }
}

export const loadInfo = (pageNumber, pageSize, sortColumn, isAscending = true, endpoint, searchParams, actionType) => {
  return async (dispatch) => {
    const from = (pageNumber - 1) * pageSize
    const to = from + pageSize - 1
    // let endpoint = `/cfs/rest/admin/adminUser/users?sort=${isAscending?'+':'-'}${sortColumn}`
    if (searchParams) {
      // searchParams: e.g. [{type: 'name', value: 'Maryam'},]
      endpoint += '&where={' + searchParams.filter(item => item.value && item.value != '')
      .map(item => {
        // 1: start
        // 2: end
        if (item.type.endsWith('1') || item.type.endsWith('2')) { // e.g. ivoice.from1
        const itemtype = item.type.substr(0, item.type.length - 1) // Remove 1|2 from the end
        const startEnd = searchParams.filter(itm => itm.value && itm.value != ''
        && itm.type.includes(itemtype)) // fetch an array including both 1 and 2
        console.log('startEnd', item, startEnd);
        let itemvalue = ''
        if (startEnd.length == 2) {
          if (item.type.endsWith('1')) {
            itemvalue = new Date(startEnd[0].value).getTime() + ',' + new Date(startEnd[1].value).getTime()
          } else {
            // only ONE check on two items
            return
          }
        } else if (startEnd.length == 1) {
          if (startEnd[0].type.endsWith('1')) {
            itemvalue = new Date(startEnd[0].value).getTime() + ',NaN'
          } else if (startEnd[0].type.endsWith('2')) {
            itemvalue = 'NaN,' + new Date(startEnd[0].value).getTime()
          }
        }
        return `%22${itemtype}%22:{%22$btw%22:%22${itemvalue}%22}`
      }
      return `%22${item.type}%22:{%22$${item.value == 'false' || item.value == 'true'
        || ['primaryDisk', 'cpuCores', 'ram'].includes(item.type)
        || item.type.includes('id')?
        'eq': 'lk'}%22:%22${typeof(item.value) == 'string'? item.value.trim(): item.value}%22}`
      })
      .join(',') + '}'
    }
    console.log('range action:', pageNumber, pageSize, sortColumn, isAscending, from, to, searchParams);
    return dispatch(fetch(endpoint, actionType, 'GET', null, null, null, true, false, {'Range': `items=${from}-${to}`}))
  }
}
