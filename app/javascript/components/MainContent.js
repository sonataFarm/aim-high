import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, withRouter } from 'react-router';
import GoalDetail from './GoalDetail';

const MainContent = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/goals/new">
          <GoalCreateForm />
        </Route>

        <Route path="/goals/:id">
          <GoalDetail />
        </Route>
      </Switch>
    </div>
  );
};

export default MainContent;