import api from '../util/api-util';
import { normalizeEntities } from '../util/normalize';
import { receiveErrors } from './ui-actions';

export const RECEIVE_GOALS = 'RECEIVE_GOALS';
export const BEGIN_LOADING_GOALS = 'BEGIN_LOADING_GOALS';

export const fetchAllGoals = () => dispatch => {
  dispatch(beginLoadingGoals());
  api.fetchAllGoals().then(
    res => dispatch(receiveGoals(normalizeEntities(res.data))),
    err => dispatch(receiveErrors(err.response.data))
  );
};

export const createGoal = goal => dispatch => {
  api.createGoal(goal);
};

export const beginLoadingGoals = () => ({
  type: BEGIN_LOADING_GOALS
});

export const receiveGoals = goals => ({
  type: RECEIVE_GOALS,
  payload: goals
});