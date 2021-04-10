import api from '../util/api-util';

import normalize from '../util/normalize';
import { receiveErrors } from './ui-actions';

export const RECEIVE_GOALS = 'RECEIVE_GOALS';

export const fetchAllGoals = () => dispatch => {
  api.fetchAllGoals().then(
    res => dispatch(receiveGoals(normalize(res.data))),
    err => dispatch(receiveErrors(err.response.data))
  );
};

export const receiveGoals = goals => ({
  type: RECEIVE_GOALS,
  payload: goals
});