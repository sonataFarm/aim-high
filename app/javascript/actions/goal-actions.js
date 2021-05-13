import api from '../util/api-util';
import { receiveErrors } from './ui-actions';

export const RECEIVE_GOAL = 'RECEIVE_GOAL';
export const RECEIVE_GOALS = 'RECEIVE_GOALS';
export const BEGIN_LOADING_GOALS = 'BEGIN_LOADING_GOALS';

export const fetchAllGoals = () => dispatch => {
  dispatch(beginLoadingGoals());
  api.fetchAllGoals().then(
    res => dispatch(receiveGoals(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  );
};

export const createGoal = goal => dispatch => (
  api.createGoal(goal).then(
    res => dispatch(receiveGoal(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const beginLoadingGoals = () => ({
  type: BEGIN_LOADING_GOALS
});

export const receiveGoals = goals => ({
  type: RECEIVE_GOALS,
  payload: goals
});

export const receiveGoal = goal => ({
  type: RECEIVE_GOAL,
  payload: goal
});