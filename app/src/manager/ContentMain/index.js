import React from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import LoadableComponent from '../../utils/LoadableComponent';
import PrivateRoute from '../../components/PrivateRoute';

const Print = LoadableComponent(() =>
  import('../../routes/Manager/PrintTable/index')
);

@withRouter
class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: 'relative' }}>
        <Switch>
          <PrivateRoute exact path="/manager/print" component={Print} />
        </Switch>
      </div>
    );
  }
}

export default ContentMain;
