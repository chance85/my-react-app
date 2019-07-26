import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './css/Login.css'
import { login } from './../redux/actions'
import store from './../redux/store'
import $ from './../util/Http'

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.userName === 'admin' && values.password === 'admin') {
          // console.log(values)
          // 登录发送登录请求
          $.post('/api/jianshu/login', {
            userName: values.userName,
            password: values.password
          }).then(res => {
            // console.log(res)
            let { is_login, token } = res
            if (is_login) {
              // 请求成功则跳转
              const action = login(true)
              store.dispatch(action)
              // 若账户密码正确,服务端返回一个token密钥, 将登录密钥存储在sessionStorage中
              sessionStorage.setItem('token', token)
              this.props.history.push('/homepage')
            } else {
              console.log(res)
            }
          })
        } else {
          alert('账号或密码错误. 账号:admin 密码:admin')
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入您的用户名!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码!' }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'normal_login' })(Login)
