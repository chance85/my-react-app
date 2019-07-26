import * as actionTypes from './../actions/Types'
import {loadInitState} from './../redux-init'

const IsLoadReducer = (state = loadInitState.loading, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return action.loading

    case actionTypes.LOADED:
      return action.loaded

    default:
      return state
  }
}

export default IsLoadReducer
