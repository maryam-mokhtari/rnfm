// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers'
// import { apiMiddleware } from 'redux-api-middleware';
// // import {routerMiddleware, routerReducer} from 'react-router-redux'
// // import browserHistory from 'react-router/lib/browserHistory'
// const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
//
//
// export default function configureStore(preloadedState) {
//   const store = createStore(
//     rootReducer,
//     preloadedState,
//     compose(
//       applyMiddleware(
//         thunk,
//         apiMiddleware,
//         // routerMiddleware(browserHistory),
//       ),
//     )
//   )
//
//   return store
// }



import { AsyncStorage } from 'react-native';
// import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { persistStore } from 'redux-persist';
import { apiMiddleware } from 'redux-api-middleware';
import reducer from '../reducers';
import promise from './promise';

export default function configureStore(onCompletion:()=>void):any {
  const enhancer = compose(
    applyMiddleware(thunk, promise, apiMiddleware),
    // devTools({
    //   name: 'nativestarterkit', realtime: true,
    // }),
  );

  const store = createStore(reducer, enhancer);
  // persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
