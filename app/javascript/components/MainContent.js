import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import GoalDetail from './GoalDetail';
import CreateGoalForm from './CreateGoalForm';

const MainContent = () => (
  <div>
    <Switch>
      <Route path="/goals/new">
        <CreateGoalForm />
      </Route>
      <Route path="/goals/:id">
        <GoalDetail />
      </Route>
    </Switch>
  </div>
);

export default MainContent;