import { RECEIVE_ERRORS } from '../../actions/ui-actions';

const _nullState = [];

const errorsReducer = (state = _nullState, action) => {
  switch(action.type) {
    case RECEIVE_ERRORS: 
      return [ ...state, ...action.payload ];
    default:
      return state;
  }
};

export default errorsReducer;