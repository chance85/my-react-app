import Loadable from 'react-loadable'

// 利用react-loadable 实现按需加载
const Homepage = Loadable({
  loader: () => import('./../modules/homepageJS'),
  loading: () => null
})
const Homeindex = Loadable({
  loader: () => import('./../modules/HomeIndex'),
  loading: () => null
})
const Login = Loadable({
  loader: () => import('./../modules/Login'),
  loading: () => null
})
const Tompage = Loadable({
  loader: () => import('./../modules/Tompage'),
  loading: () => null
})
const Billpage = Loadable({
  loader: () => import('./../modules/Billpage'),
  loading: () => null
})
const Is404 = Loadable({
  loader: () => import('./../modules/404'),
  loading: () => null
})
const RetroSnaker = Loadable({
  loader: () => import('./../modules/games/RetroSnaker'),
  loading: () => null
})

/**
 * 有路配置项
 * restricted: 是否需要限制
 */
const routes = [
  {
    path: '/',
    exact: true,
    restricted: false,
    component: Login
  },
  {
    path: '/login',
    restricted: false,
    component: Login
  },
  {
    path: '/homepage',
    restricted: true,
    component: Homepage,
    children: [
      /* user页面 */
      {
        path: '/homepage/homeindex',
        restricted: true,
        component: Homeindex
      },
      {
        path: '/homepage/tompage',
        restricted: true,
        component: Tompage
      },
      {
        path: '/homepage/billpage',
        restricted: true,
        component: Billpage
      },
      /* games页面 */
      {
        path: '/homepage/retrosnaker',
        restricted: true,
        component: RetroSnaker
      }
    ]
  },
  {
    path: '/404',
    restricted: false,
    component: Is404
  }
]

export default routes
