import { combineReducers } from 'redux';
import entities from './entities/entities-reducer';
import session from './session-reducer';
import ui from './ui-reducer';

export default combineReducers({
  entities,
  session,
  ui
});
