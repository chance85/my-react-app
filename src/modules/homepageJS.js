import React, { Component } from 'react'
import Homepage from './Homepage'
import store from './../redux/store'
import { logout } from './../redux/actions'
import $ from './../util/Http'
import GetRouteClass from './../util/GetRouteClass'

class homepageJS extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
    this.gotoHomepage = this.gotoHomepage.bind(this)
    this.gotoTomPage = this.gotoTomPage.bind(this)
    this.gotoBillPage = this.gotoBillPage.bind(this)
    this.getChildrenComponents = this.getChildrenComponents.bind(this)
    this.gotoHomeindex = this.gotoHomeindex.bind(this)
    this.gotoRetroSnaker = this.gotoRetroSnaker.bind(this)
  }

  componentDidMount() {
    $.get('/api/jianshu/homepage').then(res => {
      console.log(res)
    })
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  getChildrenComponents() {
    const getRouteClass = new GetRouteClass()
    return getRouteClass.getChildren('/homepage', 2)
  }

  gotoHomeindex() {
    this.props.history.push('/homepage/homeindex')
  }

  gotoTomPage() {
    this.props.history.push('/homepage/tompage')
  }

  gotoBillPage() {
    this.props.history.push('/homepage/billpage')
  }

  gotoHomepage() {
    const action = logout(false)
    store.dispatch(action)
    sessionStorage.removeItem('token')
    this.props.history.push('/login')
  }

  gotoRetroSnaker() {
    this.props.history.push('/homepage/retrosnaker')
  }

  render() {
    return (
      <Homepage
        collapsed={this.state.collapsed}
        gotoHomeindex={this.gotoHomeindex}
        gotoTomPage={this.gotoTomPage}
        gotoBillPage={this.gotoBillPage}
        gotoHomepage={this.gotoHomepage}
        gotoRetroSnaker={this.gotoRetroSnaker}
        onCollapse={this.onCollapse}
        getChildrenComponents={this.getChildrenComponents}
      />
    )
  }
}

export default homepageJS
