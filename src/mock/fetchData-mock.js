import Mock from 'mockjs'
import fetchMock from 'fetch-mock'

const mockData = Mock.mock({
  pagename: 'this is TOM page!'
})

export default fetchMock.post('https://localhost:1234/api/jianshu/tom', () => {
  return mockData
})
