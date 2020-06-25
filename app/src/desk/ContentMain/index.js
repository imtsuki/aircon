import React from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import LoadableComponent from '../../utils/LoadableComponent';
import PrivateRoute from '../../components/PrivateRoute';

//住户管理
const Checkin = LoadableComponent(() =>
  import('../../routes/Desk/User/Checkin')
);
const Checkout = LoadableComponent(() =>
  import('../../routes/Desk/User/Checkout')
);

//房间信息
const Queryid = LoadableComponent(() =>
  import('../../routes/Desk/Information/Queryid')
);
const Queryname = LoadableComponent(() =>
  import('../../routes/Desk/Information/Queryname')
);
const Information = LoadableComponent(() =>
  import('../../routes/Desk/Information/index')
);

//账单打印
const UserCheck = LoadableComponent(() =>
  import('../../routes/Desk/Check/UserCheck')
);
const HotelCheck = LoadableComponent(() =>
  import('../../routes/Desk/Check/HotelCheck')
);
@withRouter
class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: 'relative' }}>
        <Switch>
          <PrivateRoute exact path="/desk/user/checkin" component={Checkin} />
          <PrivateRoute exact path="/desk/user/checkout" component={Checkout} />

          <PrivateRoute exact path="/desk/information/id" component={Queryid} />
          <PrivateRoute
            exact
            path="/desk/information/name"
            component={Queryname}
          />
          <PrivateRoute
            exact
            path="/desk/information/inf"
            component={Information}
          />

          <PrivateRoute exact path="/desk/check/user" component={UserCheck} />
          <PrivateRoute exact path="/desk/check/hotel" component={HotelCheck} />
        </Switch>
      </div>
    );
  }
}

export default ContentMain;
