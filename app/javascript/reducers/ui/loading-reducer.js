import { BEGIN_LOADING_GOALS, RECEIVE_GOALS } from '../../actions/goal-actions';
import { BEGIN_LOADING_VISIONS, RECEIVE_VISIONS } from '../../actions/vision-actions';

const _nullState = {
  visions: false,
  goals: false
};

const loadingReducer = (state = _nullState, action) => {
  switch(action.type) {
    case BEGIN_LOADING_VISIONS:
      return { ...state, visions: true };
    case RECEIVE_VISIONS:
      return { ...state, visions: false };
    case BEGIN_LOADING_GOALS:
      return { ...state, goals: true };
    case RECEIVE_GOALS:
      return { ...state, goals: false };
    default:
      return state;
  }
};

export default loadingReducer;