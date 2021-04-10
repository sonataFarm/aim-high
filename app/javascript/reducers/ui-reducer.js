import { RECEIVE_ERRORS } from '../actions/ui-actions';

const _nullState = { errors: [] }

const uiReducer = (state = _nullState, action) => {
  switch(action.type) {
    case RECEIVE_ERRORS: 
      return {
        ...state,
        errors: [ ...state.errors, ...action.payload ]
      };
    default:
      return state;
  }
};

export default uiReducer;