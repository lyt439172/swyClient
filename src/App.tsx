import React from 'react';
// import { Provider } from 'react-redux';
// import zhCN from 'antd/es/locale-provider/zh_CN';
import { HashRouter, Redirect } from 'react-router-dom';
import { Root } from './router';
import 'antd/dist/antd.css';
import './App.css'

function App() {
  return (
    <HashRouter>
      <Root />
      <Redirect from={'*'} exact to={'/login'}></Redirect>
    </HashRouter>
  );
}

export default App;
