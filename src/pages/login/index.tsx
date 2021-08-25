import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Scene } from 'three';
import './index.scss';
// import $http from './http';
import { RouteComponentProps } from 'react-router';

export default class Login extends React.Component<RouteComponentProps> {

  state = {
    loading: false
  }

  componentDidMount() {

  }

  handleLogin(values?: any) {
    console.log('ok')
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.props.history.push('/index')
    }, 500)
  }

  render() {
    const { loading } = this.state
    return (
      <div className="login">
        <div className="login-box">
          <div className="login-title">欢迎来到登录页面</div>
          <div className="login-tooltip">SWY-II型水位仪故障检测系统</div>
          <Form
            onFinish={() => this.handleLogin()}
            className="login-form">
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
          
        </div>
      </div>
    )
  }
}