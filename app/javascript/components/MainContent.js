import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import GoalDetail from './GoalDetail';
import VisionDetail from './VisionDetail';
import CreateGoalForm from './CreateGoalForm';
import CreateVisionForm from './CreateVisionForm';

const MainContent = () => (
  <div>
    <Switch>
      <Route path="/goals/new">
        <CreateGoalForm />
      </Route>
      <Route path="/visions/new">
        <CreateVisionForm />
      </Route>
      <Route path="/goals/:id">
        <GoalDetail />
      </Route>
      <Route path="/visions/:id">
        <VisionDetail />
      </Route>
    </Switch>
  </div>
);

export default MainContent;