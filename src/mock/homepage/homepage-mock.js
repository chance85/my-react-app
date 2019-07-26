import Mock from 'mockjs'

const fn = options => {
  // console.log(options.url)

  let mockData = Mock.mock({
    'authorities|3-6': ['权限1', '权限2', '权限3']
  })
  return { mockData }
}

export default Mock.mock(
  'https://localhost:1234/api/jianshu/homepage',
  'get',
  fn
)
