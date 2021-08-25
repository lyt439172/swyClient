import loadable from '@loadable/component';
import { RouteComponentProps } from 'react-router';

export interface RouteConfigProps {
  path: string,
  exact: boolean,
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
  id: number | string,
  name?: string,
  routes?: Array<RouteConfigProps>
}

const Index = loadable(() => import('../pages/index'));
const Login = loadable(() => import('../pages/login'));
const Tables = loadable(() => import('../pages/table'));
const Testing = loadable(() => import('../pages/testing'));

export const routeConfig: Array<RouteConfigProps> = [
  {
    path: '/login',
    exact: true,
    component: Login,
    id: 'login',
    name: '登录',
    routes: []
  },
  {
    path: '/index',
    exact: false,
    component: Index,
    id: 'index',
    name: '首页',
    routes: [
      {
        path: '/index/table',
        exact: false,
        component: Tables,
        id: 1,
        name: '数据统计',
      },
      {
        path: '/index/testing',
        exact: false,
        component: Testing,
        id: 2,
        name: '逐步检测'
      }
    ]
  }
]