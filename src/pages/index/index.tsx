import React from 'react';
import { Menu, Dropdown, Layout } from 'antd';
import { Switch } from 'react-router-dom';
import { LogoutOutlined, TableOutlined, ApiOutlined, SettingOutlined } from '@ant-design/icons';
import './index.scss';
import { RouteConfigProps } from '../../router/router';
import { SubRoute } from '../../router/subRoute';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

interface NavProps {
  path: string,
  name: string,
  key: string,
  id: number | string,
  children?: Array<NavProps>,
  icon?: React.ReactNode
}
export default class Index extends React.Component<any> {

  state = {
    menuKey: 'index'
  }

  navMenu: Array<NavProps> = [
    {
      path: '/index/table',
      name: '数据统计',
      key: 'table',
      id: 'table',
      icon: <TableOutlined />
    },
    {
      path: '/index/testing',
      name: '逐步检测',
      key: 'testing',
      id: 'testing',
      icon: <ApiOutlined />
    }
  ]

  componentDidMount() {
    
  }

  renderNav(data: Array<NavProps>) {
    return data.map((v) => {
      if(!v.children || v.children.length < 1) {
        return this.renderNavItem(v)
      }
      return (
        <SubMenu key={v.key} icon={v.icon} title={v.name}>
          {
            v.children.map((item) => {
              return this.renderNavItem(item)
            })
          }
        </SubMenu>
      )
    })
  }

  changePath(data: {
    key: string,
    path: string
  }) {
    this.setState({
      menuKey: data.key
    }, () => {
      this.props.history.push(data.path)
    })
  }

  renderNavItem(data: NavProps) {
    return (
      <Menu.Item
        onClick={() => this.changePath(data)}
        key={data.key}
        icon={data.icon}>
        {data.name}
      </Menu.Item>
    )
  }

  render() {
    const {menuKey} = this.state
    const dropMenu = (
      <Menu>
        <Menu.Item
          onClick={() => this.changePath({key: '', path: '/login'})}
          key={'logout'}
          icon={<LogoutOutlined />}
        >
          退出登录
        </Menu.Item>
      </Menu>
    )
    return (
        <Layout className="index">
          <Header className="header">
            <div>
              SWY-II型水位仪故障检测系统
            </div>
            <Dropdown overlay={dropMenu} trigger={['click']}>
              <SettingOutlined />
            </Dropdown>
          </Header>
          <Layout>
            <Sider className="sider">
              <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[menuKey]}
              >
                {this.renderNav(this.navMenu)}
              </Menu>
              <div className="footer">
                <div>研制单位：辽宁省地震局</div>
                <div>技术支持：辽宁省地震局</div>
                <div>地址：辽宁省沈阳市皇姑区黄河北大街44号</div>
                <div style={{marginTop: '8px'}}>辽宁省地震局 版权所有</div>
              </div>
            </Sider>
            <Content className="content">
              <Switch>
                {
                  this.props.routes.map((item: RouteConfigProps) => {
                    return (
                      <SubRoute
                        {...item}
                        key={item.id}
                        path={item.path}
                        changePath={this.changePath.bind(this)}
                      />
                    )
                  })
                }
              </Switch>
            </Content>
          </Layout>
        </Layout>

    )
  }
}