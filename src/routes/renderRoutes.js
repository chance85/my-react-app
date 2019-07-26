import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

/**
 * 渲染组件
 * @param {Array} routes || children
 * @param {Boolean} authed 客户是否有登录
 * @param {String} authPath 客户未登录时, 输入其他页面地址时跳转到'/login'
 * 'return <route.component {...props} route={route} />'
 */
const renderRoutes = (routes, authed, authPath = '/login') =>
  routes ? (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={route.key || index}
            sensitive={true}
            path={route.path}
            exact={route.exact}
            render={props => {
              if (!route.restricted || authed || route.path === authPath) {
                return <route.component {...props} />
              }
              const redirPath = authPath
              return <Redirect to={{ pathname: redirPath }} />
            }}
          />
        )
      })}
      {/* <Redirect to={{ pathname: '/404' }} /> */}
    </Switch>
  ) : null

export default renderRoutes
