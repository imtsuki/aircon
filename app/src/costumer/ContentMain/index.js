import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../../components/PrivateRoute'

//客户组件
const ChangeWind = LoadableComponent(()=>import('../../routes/Costumer/Change/ChangeWind'))
const ChangeTem = LoadableComponent(()=>import('../../routes/Costumer/Change/ChangeTem'))

//信息显示组件
const TableDemo = LoadableComponent(()=>import('../../routes/Costumer/Information/index'))

@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>
          <PrivateRoute exact path='/c/change/changewind' component={ChangeWind}/>
          <PrivateRoute exact path='/c/change/changetem' component={ChangeTem}/>

          <PrivateRoute exact path='/c/information' component={TableDemo}/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain