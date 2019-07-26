import { combineReducers } from 'redux'
import loginReducer from './LoginReducer'
import isLoadReducer from './IsLoadReducer'

//【注意】import的Reducer名称需与state中相应属性一致，
//因为combineReducers的参数是个对象，该对象的属性需与state中相应属性一致。
const reducers = combineReducers({
  loginReducer,
  isLoadReducer
})

export default reducers
