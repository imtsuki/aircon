import React, {Component} from 'react';
import PrivateRoute from './components/PrivateRoute'
import {Route,Switch} from 'react-router-dom'
import Login from './routes/Login/index'
import Cindex from './routes/Costumer/index'
import Findex from './routes/Frontdesk/index'
import Aindex from './routes/Admin/index'
import Hindex from './routes/HotelManager/index'
import Index from './routes/Index/index'
import './App.css'
import './assets/font/iconfont.css'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/a' component={Aindex}/>
        <PrivateRoute path='/h' component={Hindex}/>
        <PrivateRoute path='/f' component={Findex}/>
        <PrivateRoute path='/c' component={Cindex}/>
      </Switch>
    )
  }
}

export default App;
