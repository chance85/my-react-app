import * as actionTypes from './../actions/Types'
import AppInitStates from './../AppInitStates'

const loginReducer = (state = AppInitStates.login, action) => {
  if (sessionStorage.getItem('token')) {
    state = true
  }
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.login
    case actionTypes.LOGOUT:
      return action.logout
    default:
      return state
  }
}

export default loginReducer
