import _ from 'lodash';
import { RECEIVE_GOAL, RECEIVE_GOALS, REMOVE_GOAL } from '../../actions/goal-actions';
import { RECEIVE_OBSTACLE, REMOVE_OBSTACLE } from '../../actions/obstacle-actions';
import { normalizeEntities } from '../../util/normalize';

const ObstaclesReducer = (state = {}, action) => {
  let obstacles;
  
  switch (action.type) {
    case RECEIVE_OBSTACLE:
      const obstacle = action.payload;
      return { ...state, [obstacle.id]: obstacle };
    case REMOVE_OBSTACLE:
      const id = action.payload;
      return _.pickBy(state, (v, k) => v.id !== id);
    case RECEIVE_GOAL:
      obstacles = action.payload.obstacles;
      return { ...state, ...normalizeEntities(obstacles) };
    case RECEIVE_GOALS:
      obstacles = action.payload.reduce((o, g) => {
        return [ ...o, ...g.obstacles ];
      }, []);
      
      return { ...state, ...normalizeEntities(obstacles) };
    case REMOVE_GOAL:
      return _.pickBy(state, (v, k) => v.goalId !== action.payload)
    default: 
      return state;
  }
}

export default ObstaclesReducer;