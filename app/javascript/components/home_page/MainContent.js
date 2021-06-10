import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import GoalDetail from '../goals/GoalDetail';
import VisionDetail from '../visions/VisionDetail';
import CreateGoalForm from '../goals/CreateGoalForm';
import CreateVisionForm from '../visions/CreateVisionForm';
import GoalsIndex from '../goals/GoalsIndex';
import ToReviewIndex from '../reviews/ToReviewIndex';

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