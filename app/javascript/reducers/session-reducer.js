import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/session-actions';

const _nullSession = {
  currentUser: null
};

const SessionReducer = (state = _nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case REMOVE_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
}

export default SessionReducer;
