import _ from 'lodash';
import { RECEIVE_GOAL, RECEIVE_GOALS, REMOVE_GOAL } from '../../actions/goal-actions';
import { RECEIVE_REVIEW } from '../../actions/review-actions';
import { normalizeEntity, normalizeEntities } from '../../util/normalize';

const GoalsReducer = (state = {}, action) => {
  let goal; 

  switch (action.type) {
    case RECEIVE_GOAL:
      goal = action.payload;
      return { ...state, [goal.id]: normalizeEntity(goal) }
    case RECEIVE_GOALS:
      return { ...state, ...normalizeEntities(action.payload) };
    case RECEIVE_REVIEW:
      const review = action.payload;
      goal = state[review.goalId];
      return { ...state, [goal.id]: {
        ...goal, reviews: _.uniq([ ...goal.reviews, review.id ])
      }}
    case REMOVE_GOAL:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default: 
      return state;
  }
};

export default GoalsReducer;