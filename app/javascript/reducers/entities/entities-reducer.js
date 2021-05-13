import { combineReducers } from 'redux';
import goals from './goals-reducer';
import visions from './visions-reducer';
import obstacles from './obstacles-reducer';

export default combineReducers({
  goals,
  visions,
  obstacles
});