import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../../components/PrivateRoute'

//住户管理
const Checkin = LoadableComponent(()=>import('../../routes/Frontdesk/User/Checkin'))
const Checkout = LoadableComponent(()=>import('../../routes/Frontdesk/User/Checkout'))

//房间信息
const Queryid = LoadableComponent(()=>import('../../routes/Frontdesk/Information/Queryid'))
const Queryname = LoadableComponent(()=>import('../../routes/Frontdesk/Information/Queryname'))
const Information = LoadableComponent(()=>import('../../routes/Frontdesk/Information/index'))

//账单打印
const UserCheck = LoadableComponent(()=>import('../../routes/Frontdesk/Check/UserCheck'))
const HotelCheck = LoadableComponent(()=>import('../../routes/Frontdesk/Check/HotelCheck'))
@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>

          <PrivateRoute exact path='/f/user/checkin' component={Checkin}/>
          <PrivateRoute exact path='/f/user/checkout' component={Checkout}/>

          <PrivateRoute exact path='/f/information/id' component={Queryid}/>
          <PrivateRoute exact path='/f/information/name' component={Queryname}/>
          <PrivateRoute exact path='/f/information/inf' component={Information}/>

          <PrivateRoute exact path='/f/check/user' component={UserCheck}/>
          <PrivateRoute exact path='/f/check/hotel' component={HotelCheck}/>

        </Switch>
      </div>
    )
  }
}

export default ContentMain