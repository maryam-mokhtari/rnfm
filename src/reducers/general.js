import ActionTypes from '../actions/ActionTypes'
const initialState = {
  messages: [],
  modal: null,
  config: {
    selectedId: 1,
    data: [{
      id: 1,
      name: 'PersianGig',
      logo: 'http://www.persiangig.com/wp-content/uploads/2016/05/persiangig.png',
      shouldResetPassword: false,
      shouldUpgrade: false,
      shouldHaveGraph: false,
      shouldHavePlans: true,
      shouldCreateNetwork: false,
      shouldHaveDiscountCode: true,
      isDurationServiceActive: true,
      isVNC: false,
    }
  ]}
}
export default function general(state = initialState , action) {
  var {messages} = state

  switch (action.type) {
    case ActionTypes.MODAL_SHOW:
      return {...state,modal:{
        title: action.title,
        content: action.content,
        acceptedAction: action.acceptedAction,
        args: action.args,
      }}
    case ActionTypes.MODAL_HIDE:
      return {...state, modal: null}
    default:
      return state
  }
}
