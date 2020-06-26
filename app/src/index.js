import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import history from './history';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import store from './store';

//打包时，用的HashRouter并加上了basename，因为放在服务器的二级目录下
ReactDOM.render(
  <Router history={history}>
    <LocaleProvider locale={zh_CN}>
      <Provider {...store}>
        <App />
      </Provider>
    </LocaleProvider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
