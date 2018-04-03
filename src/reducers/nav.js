import ActionTypes from '../actions/ActionTypes'
import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../mobile/navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState
// );

export default function nav(state, action) {
  let nextState;
  console.log('action.type:', action.type);
  switch (action.type) {

    case ActionTypes.LOGIN_SUCCESS:
    case 'Login':
      console.log('LOGIN');
      nextState = AppNavigator.router.getStateForAction(
        // NavigationActions.back(),
        NavigationActions.navigate({ routeName: 'MainNavigator' }),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'Navigation/NAVIGATE':
      let tab = undefined
      if (state && state.routes && state.routes[0]) {
        tab = state.routes[0].index == 1? 'shared': state.routes[0].index == 2? 'trash': undefined
      }
      let newState = {...state, tab}
      nextState = AppNavigator.router.getStateForAction(action, newState);
      break;
    case 'MODAL_STATE':
      nextState = {...state, modalState: action.modalState}
      break;
    case 'MODAL_TEXT':
      nextState = {...state, modalText: action.modalText}
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
