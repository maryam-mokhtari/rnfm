import {getErrorMessage, errors} from './errors'

export const getCount = (data, range) => {
  let count = 0
  if (data) {
    let arr1 = range.split(' ')
    if (arr1.length > 1) {
      let arr2 = arr1[1].split('/')
      if (arr2.length > 1) {
        count = arr2[1]
      }
    }
  }
  return count
}

export const getNewStateOnFailure = (state, actionPayload, isCwsError) => {
  let newState = {...state}
  let errorMessage = getErrorMessage(0, errors)
  if (actionPayload && actionPayload.errors && actionPayload.errors[0]) {
    errorMessage = actionPayload.errors[0].msg
    const errorCode = actionPayload.errors[0].code
    errorMessage = getErrorMessage(errorCode, errors, isCwsError)
    if (errorCode == 403) {
      newState = {...state, isAuthenticated: false}
      errorMessage = null
    }
  }
  return {newState, errorMessage}
}
