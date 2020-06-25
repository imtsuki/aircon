import React, { Component } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { Route, Switch } from 'react-router-dom';
import Login from './routes/Login/index';
import Client from './routes/Client';
import Desk from './routes/Desk';
import Admin from './routes/Admin';
import Manager from './routes/Manager';
import Index from './routes/Index/index';
import './App.css';
import './assets/font/iconfont.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" component={Admin} />
        <PrivateRoute path="/manager" component={Manager} />
        <PrivateRoute path="/desk" component={Desk} />
        <PrivateRoute path="/client" component={Client} />
      </Switch>
    );
  }
}

export default App;
