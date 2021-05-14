import { combineReducers } from 'redux';
import goals from './goals-reducer';
import visions from './visions-reducer';
import obstacles from './obstacles-reducer';
import reviews from './reviews-reducer';

export default combineReducers({
  visions,
  goals,
  obstacles,
  reviews
});