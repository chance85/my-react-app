import AppConfig from './../config/AppConfig'

let common_url = AppConfig.getNodeEnv().base_url
let token = ''
if (sessionStorage.getItem('token')) {
  token = sessionStorage.getItem('token')
}
let init = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    accesstoken: token
  },
  mode: 'cors' // 允许跨域, 并可以防止cors攻击
}

/**
 * timeout表示请求的response时间, 包括请求的链接, 服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了, 本次请求不会被abort丢弃掉, 他的后台仍然会发送到服务器, 只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetch_promise fetch请求返回的Promise
 * @param {Number} tomeout 请求超时时间
 * @return 返回Promise
 */
let timeout_fetch = (fetch_promise, timeout = 30000) => {
  let timeout_fn = null

  // 这是一个呗被reject的promise
  let timeout_promise = new Promise((resolve, reject) => {
    timeout_fn = () => {
      reject('***请求超时***')
    }
  })

  // 这里使用Promise.race, 以最快 resolve 或 reject 的结果来传入后续绑定的回调
  let abortable_promise = Promise.race([fetch_promise, timeout_promise])

  setTimeout(() => {
    timeout_fn()
  }, timeout)

  return abortable_promise
}

const Fetch = (url, method, params = '') => {
  if (params === '') {
    // get请求
    return new Promise((resolve, reject) => {
      timeout_fetch(
        fetch(common_url + url, {
          method,
          ...init
        })
      ).then(response => {
        let status = response.status
        if (status === 200) {
          // response.json() 返回一个Promise对象, 后台中的body响应
          response
            .json()
            .then(resData => {
              resolve(resData) // 网络请求成功时返回的数据
            })
            .catch(error => {
              console.log('返回的可能不是正确的json报文')
              reject(error)
            })
        } else if (status >= 500) {
          console.error('Service_Error: 服务器处理错误')
        } else {
          console.error('Http_Error: 其他状态码错误')
        }
      })
    })
  } else {
    // 如果请求中没有参数(POST请求)
    return new Promise((resolve, reject) => {
      timeout_fetch(
        fetch(common_url + url, {
          method,
          init,
          body: JSON.stringify(params) // body参数, 通常需要转化成字符串后服务器才能解析
        })
      ).then(response => {
        let status = response.status
        if (status === 200) {
          // response.json() 返回一个Promise对象, 后台中的body响应
          response
            .json()
            .then(resData => {
              resolve(resData) // 网络请求成功时返回的数据
            })
            .catch(error => {
              console.log('返回的可能不是正确的json报文')
              reject(error)
            })
        } else if (status >= 500) {
          console.error('Service_Error: 服务器处理错误')
        } else {
          console.error('Http_Error: 其他状态码错误')
        }
      })
    })
  }
}

export default Fetch
