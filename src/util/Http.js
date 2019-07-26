import axios from 'axios'
import AppConfig from './../config/AppConfig'
import store from './../redux/store'
import { loading, loaded } from './../redux/actions'

axios.defaults.baseURL = AppConfig.getNodeEnv().base_url
axios.defaults.timeout = 30000 // 请求超时时间
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 发送请求前需要做些什么(拦截)

    // 请求数据中......
    const action = loading(true)
    store.dispatch(action)

    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = 'token' // 让每个请求携带token
    }

    return config
  },
  error => {
    // 对请求错误做些什么
    console.log('-------------请求失败--------------')
    console.log(error)
    console.log('-------------请求失败--------------')
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // setTimeout(() => {
    // 模拟加载
    // 对响应的数据做些什么

    // 响应后加载已完成
    const action = loaded(false)
    store.dispatch(action)
    // }, 1000)

    // console.log('==================response==================');
    // console.log(response);
    // console.log('==================response==================');
    return response
  },
  error => {
    // 对响应错误做点什么

    return Promise.reject(error)
  }
)

/**
 * @param {string} url
 * @param {Object} params
 */
class Http {
  // get请求
  static get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: params })
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  //post请求
  static post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default Http
