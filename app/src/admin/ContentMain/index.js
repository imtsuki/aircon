import React from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import LoadableComponent from '../../utils/LoadableComponent';
import PrivateRoute from '../../components/PrivateRoute';

const Host = LoadableComponent(() => import('../../routes/Admin/Host/Host'));
const Hostinf = LoadableComponent(() =>
  import('../../routes/Admin/Host/Hostinf')
);
const Slave = LoadableComponent(() => import('../../routes/Admin/Slave/index'));

@withRouter
class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: 'relative' }}>
        <Switch>
          <PrivateRoute exact path="/admin/host/change" component={Host} />
          <PrivateRoute
            exact
            path="/admin/host/information"
            component={Hostinf}
          />
          <PrivateRoute exact path="/admin/slave" component={Slave} />
        </Switch>
      </div>
    );
  }
}

export default ContentMain;
