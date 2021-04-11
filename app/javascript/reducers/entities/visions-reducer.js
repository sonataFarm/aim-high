import { RECEIVE_VISIONS } from '../../actions/vision-actions';

const VisionsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_VISIONS:
      return {
        ...state,
        ...action.payload
      };
    default: 
      return state;
  }
};

export default VisionsReducer;