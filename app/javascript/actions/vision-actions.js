import api from '../util/api-util';
import { receiveErrors } from './ui-actions';

export const RECEIVE_VISION = 'RECEIVE_VISION';
export const RECEIVE_VISIONS = 'RECEIVE_VISIONS';
export const BEGIN_LOADING_VISIONS = 'BEGIN_LOADING_VISIONS';

export const fetchAllVisions = () => dispatch => (
  api.fetchAllVisions().then(
    res => dispatch(receiveVisions(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const createVision = vision => dispatch => (
  api.createVision(vision).then(
    res => dispatch(receiveVision(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const updateVision = vision => dispatch => (
  api.updateVision(vision).then(
    res => dispatch(receiveVision(res.data)),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const beginLoadingVisions = () => ({
  type: BEGIN_LOADING_VISIONS
});

export const receiveVision = vision => ({ 
  type: RECEIVE_VISION,
  payload: vision 
});

export const receiveVisions = visions => ({
  type: RECEIVE_VISIONS,
  payload: visions
});