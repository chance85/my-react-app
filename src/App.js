import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import renderRoutes from './routes/renderRoutes'
import routes from './routes/routes'
import { connect } from 'react-redux'
import './mock'

class App extends React.Component {
  render() {
    const authed = this.props.is_login // 判断客户是否有登录 默认false
    const authPath = '/login' // 客户未登录时, 输入其他页面地址时跳转到'/login'
    return (
      <Spin spinning={this.props.is_load} tip="Loading" size="large">
        <Router>{renderRoutes(routes, authed, authPath)}</Router>
      </Spin>
    )
  }
}

const mapStateToProps = state => {
  // console.log('==================state.login==================')
  // console.log(state.loginReducer)
  // console.log('====================================')
  return {
    is_login: state.loginReducer,
    is_load: state.isLoadReducer
  }
}

export default connect(mapStateToProps)(App)
