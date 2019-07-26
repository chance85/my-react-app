import Mock from 'mockjs'

const fn = options => {
  // console.log(options.url)
  // console.log(options.type)
  // console.log(options.body)

  let paramKeys = Object.keys(JSON.parse(options.body))
  let result =
    paramKeys.indexOf('userName') > -1 && paramKeys.indexOf('password') > -1

  if (!result) {
    return {
      msgError: '请求字段错误!'
    }
  }

  let mockData = Mock.mock({
    is_login: true,
    token: '1234567890',
    'username|1': ['Json', 'Tom', 'Bobo', 'xiaoming', 'laowang'],
    'password|100000-999999': 100000
  })

  return mockData
}

export default Mock.mock('https://localhost:1234/api/jianshu/login', 'post', fn)
