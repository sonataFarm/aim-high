import api from '../util/api-util';
import { receiveErrors } from './ui-actions';

export const RECEIVE_OBSTACLE = 'RECEIVE_OBSTACLE'; 
export const REMOVE_OBSTACLE = 'REMOVE_OBSTACLE';

export const createObstacle = obstacle => dispatch => (
  api.createObstacle(obstacle).then(
    res => dispatch(receiveObstacle(res.data)),
    err => dispatch(receiveErrors(err))
  )
);

export const updateObstacle = obstacle => dispatch => (
  api.updateObstacle(obstacle).then(
    res => dispatch(receiveObstacle(res.data)),
    err => dispatch(receiveErrors(err))
  )
);

export const deleteObstacle = id => dispatch => (
  api.deleteObstacle(id).then(
    res => dispatch(removeObstacle(id)),
    err => dispatch(receiveErrors(err))
  )
);

export const receiveObstacle = obstacle => ({
  type: RECEIVE_OBSTACLE,
  payload: obstacle
});

export const removeObstacle = id => ({
  type: REMOVE_OBSTACLE,
  payload: id
});

