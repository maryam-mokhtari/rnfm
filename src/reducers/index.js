import { combineReducers } from 'redux'
// import {reducer as formReducer} from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import entities from './entities'
// import { routerStateReducer as router } from 'redux-router'
import general from './general'
import language from './language'
import auth from './auth'
import nav from './nav'

const rootReducer = combineReducers({
  // formReducer,
  entities,
  general,
  routing,
  language,
  auth,
  nav,
  // router
})

export default rootReducer
