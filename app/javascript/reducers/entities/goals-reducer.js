import { RECEIVE_GOAL, RECEIVE_GOALS } from '../../actions/goal-actions';
import { normalizeEntity, normalizeEntities } from '../../util/normalize';

const GoalsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_GOAL:
      const goal = action.payload;
      return { ...state, [goal.id]: normalizeEntity(goal) }
    case RECEIVE_GOALS:
      return { ...state, ...normalizeEntities(action.payload) };
    default: 
      return state;
  }
};

export default GoalsReducer;