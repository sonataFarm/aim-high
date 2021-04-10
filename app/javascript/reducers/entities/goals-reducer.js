import { RECEIVE_GOALS } from '../../actions/goal-actions';

const GoalsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_GOALS:
      return { ...state, ...action.payload };
    default: 
      return state;
  }
};

export default GoalsReducer;