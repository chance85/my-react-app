import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import './css/Homepage.css'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

const Homepage = props => {
  return (
    <div className="homepage">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={props.collapsed}
          onCollapse={props.onCollapse}
        >
          <div className="logo" onClick={props.gotoHomeindex} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3" onClick={props.gotoTomPage}>
                Tom
              </Menu.Item>
              <Menu.Item key="4" onClick={props.gotoBillPage}>
                Bill
              </Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="7">Team 2</Menu.Item>
            </SubMenu>
            {/* game页面 */}
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="team" />
                  <span>Games</span>
                </span>
              }
            >
              <Menu.Item key="8" onClick={props.gotoRetroSnaker}>
                Retro Snaker
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#001529', padding: 0 }}>
            <div className="is-login fr">
              <span className="login-in fl" />
              <span className="login-out" onClick={props.gotoHomepage}>
                退出
              </span>
            </div>
          </Header>
          {/* 内容区 */}
          <Content style={{ margin: '16px 16px' }}>
            {/* {props.history.location.pathname === '/homepage' ? '这里是主页面' : props.getChildrenComponents()} */}
            {props.getChildrenComponents()}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default Homepage
