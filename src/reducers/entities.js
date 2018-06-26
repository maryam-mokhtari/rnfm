import ActionTypes from '../actions/ActionTypes'
import {getErrorMessage, errors} from '../utils/errors'
import {getCount, getNewStateOnFailure} from '../utils/entities'
import {AsyncStorage} from 'react-native'

const initialState = {
  messageText: '',
}

async function saveToken(token) {
  await AsyncStorage.setItem('token', token)
  const val = await AsyncStorage.getItem('token')
  console.log('token1', token, val)
}

export default function entities(state = initialState , action) {
  var {messages} = state
  let nextState = {...state, isAuthenticated: true, messageText: ''}
  console.log('ActionType: ', action.type);
  switch (action.type) {
    case ActionTypes.CURRENTUSER_REQUEST:
    case ActionTypes.FOLDER_REQUEST:
    case ActionTypes.DOCUMENTS_REQUEST:
    case ActionTypes.SHAREDDOCUMENTS_REQUEST:
    case ActionTypes.TRASHDOCUMENTS_REQUEST:
    case ActionTypes.CHILDREN_REQUEST:
    case ActionTypes.RENAME_REQUEST:
    case ActionTypes.DELETE_REQUEST:
    case ActionTypes.SHAREPG_REQUEST:
    case ActionTypes.LOGOUT_REQUEST:
    case ActionTypes.REMOVEFOREVER_REQUEST:
    case ActionTypes.RESTORETRASH_REQUEST:
    case ActionTypes.UPLOAD_REQUEST:
      return {...nextState, isLoading: true, messageText: null, messageType: null}
    case ActionTypes.LOGOUT_SUCCESS:
      AsyncStorage.removeItem('token')
      return {...nextState, isAuthenticated: false, isLoading: false, }
    case ActionTypes.CURRENTUSER_SUCCESS:
      return {...nextState, userData:action.payload, isLoading: false }
    case ActionTypes.LOGIN_SUCCESS:
      saveToken(action.payload.token)
      return {...nextState, isAuthenticated: true, isLoading: false }
    case ActionTypes.DOCUMENTS_SUCCESS:
      return {
        ...nextState,
        documents: action.payload,
        isLoading: false,
      };
    case ActionTypes.SHAREDDOCUMENTS_SUCCESS:
      return {
        ...nextState,
        sharedDocuments: action.payload,
        isLoading: false,
      };
    case ActionTypes.TRASHDOCUMENTS_SUCCESS:
      return {
        ...nextState,
        trashDocuments: action.payload,
        isLoading: false,
      };
    case ActionTypes.CHILDREN_SUCCESS:
      return {
        ...nextState,
        documents: action.payload.children,
        isLoading: false
      };
    case ActionTypes.RENAME_SUCCESS:
      const docId = action.meta
      const docIndex = state.documents.map((doc, index) => doc.id == docId? index:null).filter(i=>i!=null)[0]
      return {
        ...nextState,
        documents: [...state.documents.slice(0, docIndex), action.payload, ...state.documents.slice(docIndex + 1)],
        isLoading: false
      };
    case ActionTypes.DELETE_SUCCESS:
      // const docIds = action.meta.split(',')
      return {
        ...nextState,
        // documents: state.documents.filter(doc => !docIds.includes(doc.id))
        documents: state.documents.filter(doc => doc.id != action.meta),
        isLoading: false
      };
    case ActionTypes.UPLOAD_SUCCESS:
    case ActionTypes.SHAREPG_SUCCESS:
    case ActionTypes.REMOVEFOREVER_SUCCESS:
    case ActionTypes.RESTORETRASH_SUCCESS:
      return {
        ...nextState,
        isLoading: false
      };
    case ActionTypes.LOGIN_FAILURE:
      return {...nextState, isAuthenticated: false }
    case ActionTypes.LOGOUT_FAILURE:
      AsyncStorage.removeItem('token')
      return {...nextState, isAuthenticated: false }
      // return nextState

    case ActionTypes.CURRENTUSER_FAILURE:
    case ActionTypes.DOCUMENTS_FAILURE:
    case ActionTypes.SHAREDDOCUMENTS_FAILURE:
    case ActionTypes.TRASHDOCUMENTS_FAILURE:
    case ActionTypes.CHILDREN_FAILURE:
    case ActionTypes.RENAME_FAILURE:
    case ActionTypes.FOLDER_FAILURE:
    case ActionTypes.DELETE_FAILURE:
    case ActionTypes.SHAREPG_FAILURE:
    case ActionTypes.REMOVEFOREVER_FAILURE:
    case ActionTypes.RESTORETRASH_FAILURE:
    case ActionTypes.UPLOAD_FAILURE:
      console.log('ERROR:', action, JSON.stringify(action.payload.errors));
      const {newState, errorMessage} = getNewStateOnFailure(state, action.payload)
      nextState = {...newState, messageText: errorMessage, messageType: 'danger', isLoading: false, }
      if (action.payload && action.payload.errors && Array.isArray(action.payload.errors)
        && action.payload.errors[0].code && action.payload.errors[0].code == 403) {
        nextState = {...nextState, isAuthenticated: false}
      }
      return nextState

    default:
      return state
  }
}
