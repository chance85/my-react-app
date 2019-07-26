/**
 * 获取程序的node环境
 */

// 判断当前应用是否处于测试环境
const is_development = () => {
  let node_env = process.env.NODE_ENV // 获取当前的开发环境   development 开发环境    production 生产环境
  if (node_env === 'development') {
    console.log('应用当前处于[开发环境]')
    return true
  } else {
    console.log('应用当前处于[生产环境]')
    return false
  }
}

// 测试环境URL地址
const devConfig = {
  base_url: 'https://localhost:1234'
}

// 生产环境URL地址
const productConfig = {
  base_url: 'https://localhost:shengchan'
}

class AppConfig {
  static getNodeEnv() {
    if (is_development()) return devConfig
    else return productConfig
  }
}

export default AppConfig
