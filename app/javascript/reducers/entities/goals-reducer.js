import _ from 'lodash';
import { RECEIVE_GOAL, RECEIVE_GOALS, REMOVE_GOAL } from '../../actions/goal-actions';
import { RECEIVE_REVIEW, REMOVE_REVIEW } from '../../actions/review-actions';
import { RECEIVE_OBSTACLE, REMOVE_OBSTACLE } from '../../actions/obstacle-actions';
import { normalizeEntity, normalizeEntities } from '../../util/normalize';

const GoalsReducer = (state = {}, action) => {
  let goal, goalId; 

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
      }};
    case RECEIVE_OBSTACLE: 
      const obstacle = action.payload;
      goal = state[obstacle.goalId];
      return { ...state, [goal.id]: {
        ...goal, obstacles: _.uniq([ ...goal.obstacles, obstacle.id ])
      }};
    case REMOVE_GOAL:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    case REMOVE_REVIEW:
      const reviewId = action.payload;
      goalId = _.findKey(state, (g => g.reviews.includes(reviewId)));
      goal = state[goalId];

      const reviews = goal.reviews.filter(id => id !== reviewId);
      return { ...state, [goalId]: { ...goal, reviews } };
    case REMOVE_OBSTACLE:
      const obstacleId = action.payload;
      goalId = _.findKey(state, (g => g.obstacles.includes(obstacleId)));
      goal = state[goalId];

      const obstacles = goal.obstacles.filter(id => id !== obstacleId);
      return { ...state, [goalId]: { ...goal, obstacles } };
    default: 
      return state;
  }
};

export default GoalsReducer;