import { combineReducers } from 'redux';
import goals from './goals-reducer';
import visions from './visions-reducer'

export default combineReducers({
  goals,
  visions
});