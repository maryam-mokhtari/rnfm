import * as userActions from './userActions'
import * as generalActions from './generalActions'
import * as documentActions from './documentActions'

import ActionTypes from './ActionTypes'

module.exports = {
  ...userActions,
  ...generalActions,
  ...documentActions,
}
