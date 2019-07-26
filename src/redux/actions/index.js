import * as actionTypes from './Types'

// 返回登录的action
export const login = login => ({
  type: actionTypes.LOGIN,
  login
})

// 返回登出的action
export const logout = logout => ({
  type: actionTypes.LOGOUT,
  logout
})

// 返回数据加载中的action
export const loading = loading => ({
  type: actionTypes.LOADING,
  loading
})

// 返回数据已加载中的action
export const loaded = loaded => ({
  type: actionTypes.LOADED,
  loaded
})
