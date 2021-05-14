import api from '../util/api-util';

export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';

export const updateReview = review => dispatch => (
  api.updateReview(review).then(
    res => dispatch(receiveReview(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  payload: review
});