import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER, RECEIVE_SESSION_ERRORS } from '../actions/session-actions';

const _nullSession = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = _nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        errors: []
      };
    case REMOVE_CURRENT_USER:
      return _nullSession;
    case RECEIVE_SESSION_ERRORS:
        return {
          ...state,
          errors: action.payload
        }
    default:
      return state;
  }
}

export default SessionReducer;
