import React from 'react';
import { Route, Switch } from 'react-router';
import { CreateGoalForm, GoalDetail, GoalsIndex } from '../goals';
import { VisionDetail, CreateVisionForm } from '../visions';
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