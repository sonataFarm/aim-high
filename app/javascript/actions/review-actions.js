import api from '../util/api-util';
import { fetchGoal } from './goal-actions';

export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';

export const updateReview = review => dispatch => (
  api.updateReview(review).then(
    res => dispatch(receiveReview(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const createReview = review => dispatch => (
  api.createReview(review).then(
    res => dispatch(receiveReview(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  ).then(
    res => dispatch(fetchGoal(res.payload.goalId)),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  payload: review
});