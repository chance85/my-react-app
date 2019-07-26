import React, { Component, Fragment } from 'react'
import Fetch from './../util/Fetch'

class Tompage extends Component {
  componentDidMount() {
    console.log('已到达Tom页面')
  }

  handleFetchData() {
    Fetch('/api/jianshu/tom', 'POST').then(res => {
      console.log(res)
      
    })
  }

  render() {
    return (
      <Fragment>
        <div>这是Tom页面</div>
        <button onClick={this.handleFetchData.bind(this)}>fetch数据请求</button>
      </Fragment>
    )
  }
}

export default Tompage
