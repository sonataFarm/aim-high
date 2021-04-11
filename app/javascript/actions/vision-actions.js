import api from '../util/api-util';
import { receiveErrors } from './ui-actions';
import { normalize } from '../util/normalize';

export const RECEIVE_VISIONS = 'RECEIVE_VISIONS';

export const fetchAllVisions = () => dispatch => (
  api.fetchAllVisions().then(
    res => dispatch(receiveVisions(normalize(res.data))),
    err => dispatch(receiveErrors(err.response.data))
  )
);

export const receiveVisions = visions => ({
  type: RECEIVE_VISIONS,
  payload: visions
});