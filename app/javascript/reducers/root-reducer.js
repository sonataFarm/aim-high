import { combineReducers } from 'redux';
import entities from './entities/entities-reducer';
import session from './session-reducer';
import ui from './ui/ui-reducer';
import { REMOVE_CURRENT_USER } from '../actions/session-actions';

const appReducer = combineReducers({
  entities,
  session,
  ui
});

const rootReducer = (state, action ) => {
  if (action.type === REMOVE_CURRENT_USER) {
    return appReducer(undefined, action);
  }
    
  return appReducer(state, action);
}

export default rootReducer;