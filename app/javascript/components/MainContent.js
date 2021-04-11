import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, withRouter } from 'react-router';
import GoalDetail from './GoalDetail';

const MainContent = (props) => {
  return <div style={{ width: '100%', height: '100vh' }}>
    <Switch>
      <Route path="/goals/:id">
        <GoalDetail />
      </Route>
    </Switch>
  </div>;
};

export default MainContent;