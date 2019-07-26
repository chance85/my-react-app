import { createStore } from 'redux'
import reducers from './reducers'

let reduxDevtool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, reduxDevtool)

export default store
