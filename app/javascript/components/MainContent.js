import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import GoalDetail from './GoalDetail';
import VisionDetail from './VisionDetail';
import CreateGoalForm from './CreateGoalForm';
import CreateVisionForm from './CreateVisionForm';
import GoalsIndex from './GoalsIndex';
import ToReviewIndex from './ToReviewIndex';

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
      <Route exact path="/goals">
        <GoalsIndex />
      </Route>
       <Route exact path="/review">
        <ToReviewIndex />
      </Route>
      <Route>
        <GoalsIndex />
      </Route>
    </Switch>
  </div>
);

export default MainContent;